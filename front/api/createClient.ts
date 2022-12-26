import {clientApi} from './api'

interface CreateClientParams {
	name: string;
	communicationChannel: string;
	phoneNumber: string;
	mail: string;
	description?: string;
}

export default function createClient(params: CreateClientParams): Promise<number> {
	return clientApi.clientsPost(params)
}