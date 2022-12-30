import {businessCostApi} from './api'
import {BuisnessCost} from './typescript-fetch-client-generated'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'
import {BusinessCostEntity} from './useBusinessCosts'

export default function deleteBusinessCost(id: number): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsIdDelete(id))
}