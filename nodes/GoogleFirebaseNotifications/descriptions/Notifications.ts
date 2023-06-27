import {
	INodeProperties,
} from 'n8n-workflow';

export const notifications: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                      	notifications				 	 			 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Operation',
		name: 'operation',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['notifications'],
			},
		},
		options: [
			{
				name: 'Send',
				value: 'send',
				description: '',
			},
		],
		default: 'send',
		description: 'The operation to perform',
	},

	/*-------------------------------------------------------------------------- */
	/*                 				notifications:send				 	 		 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'FCM Token',
		name: 'fcmToken',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The FCM / registration token represents the client\'s app instance. It\'s generated on the client side.',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The notification\'s title',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The notification\'s body text',
	},
	// {
	// 	displayName: 'Image',
	// 	name: 'image',
	// 	type: 'string',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['notifications'],
	// 			operation: ['send'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'Contains the URL of an image that is going to be downloaded on the device and displayed in a notification',
	// },
];
