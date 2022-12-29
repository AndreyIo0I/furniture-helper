import { BuisnessCost } from './typescript-fetch-client-generated/api';
import { businessCostApi } from './api';
import { BuisnessCostEntity } from './useBusinessCosts';
import { makeAuthenticatedReq } from './useAuthenticatedSWR';

interface CreateBusinessCostParams {
	name: string
	date: string
    amount: number
}

export const mapToBuisnessCostDto = (dto: BuisnessCostEntity): BuisnessCost => ({
	id: dto.id,
    name: dto.name!,
    amount: dto.amount!,
    date: dto.date?.toISOString()
})


export default function createBusinessCost(params: CreateBusinessCostParams): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsPost(params))
}