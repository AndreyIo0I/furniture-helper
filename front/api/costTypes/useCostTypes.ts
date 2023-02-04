import useSWR, {SWRResponse} from 'swr'
import {costApi} from '../api'
import {Cost} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'


export interface CostType {
	id: number
	name: string
}

function mapCostTypesDto(dto: Cost): CostType {
	return {
		id: dto.id!,
		name: dto.name!,
	}
}

export default function useCostTypes(): SWRResponse<CostType[]> {
	return useAuthenticatedSWR(
		useSWR(
			'useCostTypes',
			async () => (await costApi.costsGet()).map(mapCostTypesDto),
		),
	)
}