import {clientApi, userApi} from './api'
import {UserDto} from './typescript-fetch-client-generated'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'

export enum UserRole {
	Admin = 0,
	Owner = 1,
	Manager = 2,
}

export interface NewUser {
	name: string
	email: string
	role: UserRole
	password: string
}

function mapNewUserToDto(user: NewUser): UserDto {
	return {
		fullName: user.name,
		email: user.email,
		role: user.role,
		password: user.password,
	}
}

export default function createUser(user: NewUser): Promise<number> {
	return makeAuthenticatedReq(() => userApi.usersPost(mapNewUserToDto(user)))
}