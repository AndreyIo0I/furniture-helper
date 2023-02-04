import {businessCostApi} from './api'
import {BuisnessCost} from './typescript-fetch-client-generated'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'
import {BusinessCostEntity} from './useBusinessCosts'

interface CreateBusinessCostParams {
	name: string
	date: string
	amount: number
}

export const mapToBusinessCostDto = (dto: BusinessCostEntity): BuisnessCost => ({
	id: dto.id,
	name: dto.name!,
	amount: dto.amount!,
	date: dto.date?.toISOString(),
})


export default function createBusinessCost(params: CreateBusinessCostParams): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsPost(params))
}