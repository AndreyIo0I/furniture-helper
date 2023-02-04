import {clientApi} from '../api'
import {ClientDto} from '../typescript-fetch-client-generated'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function updateClient(params: Required<ClientDto>): Promise<number> {
	return makeAuthenticatedReq(() => clientApi.clientsClientIdClientUpdatingPost(params, params.id))
}