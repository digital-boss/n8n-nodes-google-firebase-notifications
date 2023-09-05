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
		displayName: 'JSON Message',
		name: 'jsonMessage',
		required: true,
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
			},
		},
		default: false,
		description: 'Send the message as JSON',
	},
	{
    displayName: 'Please refer to the <a href="https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#resource:-message" target="_blank">Google documentation on the Message object</a>',
    name: 'jsonNotice',
    type: 'notice',
    displayOptions: {
      show: {
				resource: ['notifications'],
				operation: ['send'],
				jsonMessage: [true],
      },
    },
    default: '',
  },
	{
		displayName: 'Message',
		name: 'message',
		required: true,
		type: 'json',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
				jsonMessage: [true],
			},
		},
		default: '',
		description: 'The JSON object that will be sent as a message. Please do not send a string value.',
	},
	{
		displayName: 'FCM Token',
		name: 'fcmToken',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
				jsonMessage: [false],
			},
		},
		default: '',
		description: 'The FCM / registration token represents the client\'s app instance. It\'s generated on the client side.',
	},
	{
		displayName: 'Message Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
				jsonMessage: [false],
			},
		},
		default: '',
		description: 'The notification\'s title',
	},
	{
		displayName: 'Message Body',
		name: 'body',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
				jsonMessage: [false],
			},
		},
		default: '',
		description: 'The notification\'s body text',
	},

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['notifications'],
				operation: ['send'],
				jsonMessage: [false],
			},
		},
		default: '',
		options: [
			{
				displayName: 'Data',
				name: 'data',
				type: 'json',
				default: '',
				description: 'The message\'s data as JSON. Please do not send a string value.',
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
		],
	},
];
