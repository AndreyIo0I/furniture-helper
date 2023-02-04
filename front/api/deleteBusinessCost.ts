import {businessCostApi} from './api'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'

export default function deleteBusinessCost(id: number): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsIdDelete(id))
}