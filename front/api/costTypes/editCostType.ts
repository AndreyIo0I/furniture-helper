import {costApi} from '../api'
import {Cost} from '../typescript-fetch-client-generated'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'


export default function editCostType(params: Required<Cost>): Promise<number> {
	return makeAuthenticatedReq(() => costApi.costsCostIdCostUpdatingPost(params, params.id))
}