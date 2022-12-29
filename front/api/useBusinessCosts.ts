import { BuisnessCost } from './typescript-fetch-client-generated/api';
import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {businessCostApi, projectApi} from './api'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface BuisnessCostEntity {
	id: number | undefined
    name: string | undefined
    amount: number | undefined
    date: Dayjs
}

export const mapBuisnessCostDto = (dto: BuisnessCost): BuisnessCostEntity => ({
	id: dto.id,
    name: dto.name!,
    amount: dto.amount!,
    date: dayjs(dto.date!)
})


export default function useBusinessCosts(): SWRResponse<BuisnessCostEntity[]> {
	return useAuthenticatedSWR(
		useSWR('useBusinessCosts', async () => (await businessCostApi.buisnessCostsGet()).map(mapBuisnessCostDto)),
	)
}