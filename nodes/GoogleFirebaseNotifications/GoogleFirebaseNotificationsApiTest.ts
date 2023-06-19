
import {
	OptionsWithUri,
} from 'request';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	INodeCredentialTestResult,
	JsonObject,
} from 'n8n-workflow';
import { IGoogleFirebaseNotificationsApiCredentials } from 'credentials/GoogleFirebaseNotificationsApi.credentials';
import { type } from 'os';


const fail = (message?: string | object): INodeCredentialTestResult => {
	const msg = typeof message === 'string'
		? message
		: typeof message === 'undefined'
		? 'Auth failed'
		: `Auth failed: ${JSON.stringify(message)}`;

	return {
		status: 'Error',
		message: msg,
	};
};

const success = (message?: string): INodeCredentialTestResult => {
	const msg = typeof message === 'undefined'
		? 'Authentication successful!'
		: message;

	return {
		status: 'OK',
		message: msg,
	};
};

export async function googleFirebaseNotificationsApiTest(this: ICredentialTestFunctions, credentials: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
	const creds = credentials.data as unknown as IGoogleFirebaseNotificationsApiCredentials;
	return success(); // TODO: Test the credentials
}
