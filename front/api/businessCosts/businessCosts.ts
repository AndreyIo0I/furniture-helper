import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {businessCostApi} from '../api'
import {BuisnessCost} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR, {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export interface BusinessCostEntity {
	id?: number
	name?: string
	amount?: number
	date: Dayjs
}

export const mapBusinessCostDto = (dto: BuisnessCost): BusinessCostEntity => ({
	id: dto.id,
	name: dto.name!,
	amount: dto.amount!,
	date: dayjs(dto.date!),
})


export function useBusinessCosts(): SWRResponse<BusinessCostEntity[]> {
	return useAuthenticatedSWR(
		useSWR('useBusinessCosts', async () => (await businessCostApi.buisnessCostsGet()).map(mapBusinessCostDto)),
	)
}

export function editBusinessCost(cost: Required<BusinessCostEntity>): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsCostIdCostUpdatingPost({
		...cost,
		date: cost.date.toISOString(),
	}, cost.id))
}

export function deleteBusinessCost(id: number): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsIdDelete(id))
}

interface CreateBusinessCostParams {
	name: string
	date: string
	amount: number
}

export function createBusinessCost(params: CreateBusinessCostParams): Promise<number> {
	return makeAuthenticatedReq(() => businessCostApi.buisnessCostsPost(params))
}
