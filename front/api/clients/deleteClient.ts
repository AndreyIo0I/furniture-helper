import {clientApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function deleteClient(id: number): Promise<number> {
	return makeAuthenticatedReq(() => clientApi.clientsClientIdDelete(id))
}