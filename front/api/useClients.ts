import useSWR, {SWRResponse} from 'swr'
import {clientApi, projectApi} from './api'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface Client {
	id: number
	fullName: string
	source: string
	phone: string
	email: string
	description: string
}

export default function useClients(): SWRResponse<Client[]> {
	return useAuthenticatedSWR(
		useSWR('useClients', async () =>
			(await clientApi.clientsGet()).map(client => ({
				id: client.id!,
				fullName: client.name!,
				source: client.communicationChannel || '',
				phone: client.phoneNumber || '',
				email: client.mail || '',
				description: client.description || '',
			}))),
	)
}