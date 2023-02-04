import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {businessCostApi} from './api'
import {BuisnessCost} from './typescript-fetch-client-generated'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface BusinessCostEntity {
	id: number | undefined
	name: string | undefined
	amount: number | undefined
	date: Dayjs
}

export const mapBusinessCostDto = (dto: BuisnessCost): BusinessCostEntity => ({
	id: dto.id,
	name: dto.name!,
	amount: dto.amount!,
	date: dayjs(dto.date!),
})


export default function useBusinessCosts(): SWRResponse<BusinessCostEntity[]> {
	return useAuthenticatedSWR(
		useSWR('useBusinessCosts', async () => (await businessCostApi.buisnessCostsGet()).map(mapBusinessCostDto)),
	)
}