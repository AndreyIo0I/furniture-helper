import {costApi} from '../api'
import {Cost} from '../typescript-fetch-client-generated'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'


export default function createCostType(params: Cost): Promise<number> {
	return makeAuthenticatedReq(() => costApi.costsPost(params))
}