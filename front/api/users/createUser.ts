import {userApi} from '../api'
import {UserDto} from '../typescript-fetch-client-generated'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export enum UserRole {
	Admin = 0,
	Owner = 1,
	Manager = 2,
}

export interface User {
	id: number
	name: string
	email: string
	role: UserRole
}

export function mapUserToDto(user: User | NewUser | UpdatingUser): UserDto {
	return {
		id: 'id' in user ? user.id : undefined,
		fullName: user.name,
		email: user.email,
		role: user.role,
		password: 'password' in user ? user.password : undefined,
	}
}

export type NewUser = Omit<User, 'id'> & {
	password: string
}

export type UpdatingUser = User & {
	password?: string
}

export default function createUser(user: NewUser): Promise<number> {
	return makeAuthenticatedReq(() => userApi.usersPost(mapUserToDto(user)))
}