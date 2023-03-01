import {costApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'


export default function deleteCostType(id: number): Promise<number> {
	return makeAuthenticatedReq(() => costApi.costsCostIdDelete(id))
}