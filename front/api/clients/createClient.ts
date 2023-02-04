import {clientApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

interface CreateClientParams {
	name: string;
	communicationChannel: string;
	phoneNumber: string;
	mail: string;
	description?: string;
}

export default function createClient(params: CreateClientParams): Promise<number> {
	return makeAuthenticatedReq(() => clientApi.clientsPost(params))
}