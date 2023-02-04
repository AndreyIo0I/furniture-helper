import useSWR, {SWRResponse} from 'swr'
import {userApi} from '../api'
import {User, UserRole} from './createUser'
import {UserDto} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'

function mapNumberToRole(n: number): UserRole {
	if (n === UserRole.Admin) {
		return UserRole.Admin
	}
	if (n === UserRole.Owner) {
		return UserRole.Owner
	}
	return UserRole.Manager
}

export function mapUserDto(dto: UserDto): User {
	return {
		id: dto.id!,
		name: dto.fullName!,
		email: dto.email!,
		role: mapNumberToRole(dto.role!),
	}
}

export default function useUsers(): SWRResponse<User[]> {
	return useAuthenticatedSWR(
		useSWR(
			'useUsers',
			async () => (await userApi.usersSearchPost('%')).map(mapUserDto),
		),
	)
}