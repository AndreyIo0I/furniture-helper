import useSWR, {SWRResponse} from 'swr'
import {clientApi} from '../api'
import useAuthenticatedSWR from '../useAuthenticatedSWR'
import {Client, mapApiClientDto} from './useClients'

export default function useClient(clientId: number): SWRResponse<Client> {
	return useAuthenticatedSWR(
		useSWR('useClient' + clientId, async () => {
			const client = await clientApi.clientsClientIdGet(clientId)
			return mapApiClientDto(client)
		}),
	)
}