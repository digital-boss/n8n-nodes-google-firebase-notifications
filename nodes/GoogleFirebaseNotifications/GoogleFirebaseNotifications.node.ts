import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import * as admin from 'firebase-admin';
import * as descriptions from './descriptions';
import { version } from '../version';
import { googleFirebaseNotificationsApiTest } from './GoogleFirebaseNotificationsApiTest';

export class GoogleFirebaseNotifications implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Google Firebase Notifications',
		name: 'googleFirebaseNotifications',
		icon: 'file:googleFirebaseNotifications.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume GoogleFirebaseNotifications API (v.${version})`,
		defaults: {
				name: 'Google Firebase Notifications',
				color: '#FFCA28',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'googleFirebaseNotificationsApi',
				required: true,
				// testedBy: 'googleFirebaseNotificationsApiTest',
			},
		],
		properties: [

			// Resource
			{
				displayName: 'Resource',
				name: 'resource',
				required: true,
				type: 'options',
				options: [
					{
						name: 'FCM Token',
						value: 'fcmToken',
					},
					{
						name: 'Notifications',
						value: 'notifications',
					},
				],
				default: 'notifications',
				description: 'The resource to use',
			},

			...descriptions.notifications,
			...descriptions.fcmToken,
		],
	};

	methods = {
		credentialTest: {
			googleFirebaseNotificationsApiTest,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const items = this.getInputData();
		let responseData, options: IHttpRequestOptions;
		const returnData: IDataObject[] = [];

		// Get credentials
		const creds = await this.getCredentials('googleFirebaseNotificationsApi') as IDataObject;
		if (!creds) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}
		const projectId = creds.projectId as string;
		const clientEmail = creds.clientEmail as string;
		const privateKey = creds.privateKey as string;

		if (!admin.apps.length) {
			// Firebase app is not initialized, initialize it
			admin.initializeApp({
				credential: admin.credential.cert({
					projectId,
					clientEmail,
					// replace `\` and `n` character pairs w/ single `\n` character
					privateKey: privateKey.replace(/\\n/g, '\n'),
				})
			})
		}
		
		// Access the initialized Firebase app
		const app = admin.app();

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case 'notifications':
						switch (operation) {
							case 'send':
								// ----------------------------------
								//        notifications:send
								// ----------------------------------

								const title = this.getNodeParameter('title', i) as string;
								const body = this.getNodeParameter('body', i) as string;
								const token = this.getNodeParameter('fcmToken', i) as string;

								const message = {
									notification: {
										title,
										body,
									},
									token,
								};
								
								// Send a message to the device corresponding to the provided registration token
								responseData = await admin.messaging(app).send(message);
								break;

							default: {
								throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "${resource}"!`);
							}
						}
						break;

					case 'fcmToken':
						switch (operation) {
							
							case 'get': {
								// ----------------------------------
								//        fcmToken:get
								// ----------------------------------
								const firestore = admin.firestore(app);
								
								const collection = this.getNodeParameter('collection', i) as string;
								const uid = this.getNodeParameter('uid', i) as string;

								// Fetch the document's data
								responseData = (await firestore.collection(collection).doc(uid).get()).data();
								if (responseData === undefined) {
									throw new NodeOperationError(this.getNode(), 'Document not found');
								}
								break;
							}
								
							case 'removeStale': {
								
								// ----------------------------------
								//        fcmToken:removeStale
								// ----------------------------------
								
								const firestore = admin.firestore(app);

								const createdBefore = this.getNodeParameter('createdBefore', i) as number;
								const collection = this.getNodeParameter('collection', i) as string;
					
								// Query for expired tokens in your Firestore collection
								const querySnapshot = await firestore
									.collection(collection)
									.where('created_at', '<=', createdBefore)
									.get();

								// Create a batch operation
								const batch = firestore.batch();

								// Iterate over the query results and add delete operations to the batch
								querySnapshot.forEach((doc) => {
									const docRef = firestore.collection(collection).doc(doc.id);
									batch.delete(docRef);
								});

								// Commit the batched delete operation
								responseData = await batch.commit() as unknown as IDataObject;
								break;
							}
							
							case 'update': {
								// ----------------------------------
								//        fcmToken:update
								// ----------------------------------

								const firestore = admin.firestore(app);

								const collection = this.getNodeParameter('collection', i) as string;
								const uid = this.getNodeParameter('uid', i) as string;
								const fcmToken = this.getNodeParameter('fcmToken', i) as string;

								// Store the registration token in a 'tokens' collection with the user ID as the document ID
								responseData = await firestore.collection(collection).doc(uid).set({
									token: fcmToken,
									created_at: Date.now(),
								})
								break;
							}
								
							default: {
								throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "${resource}"!`);
							}
						}
						break;

					default: {
						throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported!`);
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						error: error.message,
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
