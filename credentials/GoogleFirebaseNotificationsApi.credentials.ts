import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export interface IGoogleFirebaseNotificationsApiCredentials {
	projectId: string;
	clientEmail: string;
	privateKey: string;
}

export class GoogleFirebaseNotificationsApi implements ICredentialType {
	displayName = 'Google Firebase Notifications API';
	name = 'googleFirebaseNotificationsApi';
	documentationUrl = 'googleFirebaseNotifications';
	properties: INodeProperties[] = [
		{
			displayName: 'Project ID',
			name: 'projectId',
			required: true,
			type: 'string',
			default: '',
		},
		{
			displayName: 'Client Email',
			name: 'clientEmail',
			required: true,
			type: 'string',
			default: '',
		},
		{
			displayName: 'Private Key',
			name: 'privateKey',
			required: true,
			type: 'string',
			default: '',
		},
	];
}
