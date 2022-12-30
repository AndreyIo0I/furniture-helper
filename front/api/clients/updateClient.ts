import {clientApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'
import {Client} from './useClients'

export default function updateClient(params: Client): Promise<number> {
	return makeAuthenticatedReq(() => clientApi.clientsClientIdClientUpdatingPost(params, params.id))
}