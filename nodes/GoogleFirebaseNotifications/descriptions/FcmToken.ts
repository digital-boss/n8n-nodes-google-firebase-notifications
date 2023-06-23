import {
	INodeProperties,
} from 'n8n-workflow';

export const fcmToken: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                      		fcmToken				 	 			 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a token from Firestore',
			},
			{
				name: 'Remove Stale',
				value: 'removeStale',
				description: 'Remove all tokens that were updated before a certain point in time',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a token (or create a new one if it doesn\'t exist)',
			},
		],
		default: 'update',
		description: 'The operation to perform',
	},

	/*-------------------------------------------------------------------------- */
	/*                 				fcmToken:get					 	 	 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['get'],
			},
		},
		default: 'tokens',
		description: 'The name of the collection where the tokens are stored',
	},
	{
		displayName: 'UID',
		name: 'uid',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The user ID which is set as the document ID',
	},

	/*-------------------------------------------------------------------------- */
	/*                 			fcmToken:removeStale				 	 	 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['removeStale'],
			},
		},
		default: 'tokens',
		description: 'The name of the collection with tokens',
	},
	{
		displayName: 'Created Before',
		name: 'createdBefore',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['removeStale'],
			},
		},
		default: '',
		description: 'Created before a point in time (in milliseconed). Example: 1519211809934.',
	},
	
	/*-------------------------------------------------------------------------- */
	/*                 				fcmToken:update					 	 	 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['update'],
			},
		},
		default: 'tokens',
		description: 'The name of the collection in which to store the tokens',
	},
	{
		displayName: 'UID',
		name: 'uid',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The user ID. It will be used as document ID',
	},
	{
		displayName: 'FCM Token',
		name: 'fcmToken',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['fcmToken'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The FCM / registration token',
	},

];
