import {userApi} from '../api'
import {mapUserToDto, NewUser} from './createUser'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function createUser(user: NewUser): Promise<number> {
	return makeAuthenticatedReq(() => userApi.usersPost(mapUserToDto(user)))
}