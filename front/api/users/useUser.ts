import useSWR, {SWRResponse} from 'swr'
import {userApi} from '../api'
import {User} from './createUser'
import useAuthenticatedSWR from '../useAuthenticatedSWR'
import {mapUserDto} from './useUsers'

export default function useUser(userId: number): SWRResponse<User> {
	return useAuthenticatedSWR(
		useSWR(
			'useUser' + userId,
			async () => mapUserDto(await userApi.usersIdGet(userId)),
		),
	)
}