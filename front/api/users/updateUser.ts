import {userApi} from '../api'
import {mapUserToDto, NewUser, UpdatingUser} from './createUser'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function updateUser(user: UpdatingUser): Promise<number> {
	return makeAuthenticatedReq(() => userApi.usersPost(mapUserToDto(user)))
}