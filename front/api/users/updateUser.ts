import {userApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'
import {mapUserToDto, UpdatingUser} from './createUser'

export default function updateUser(user: UpdatingUser): Promise<number> {
	return makeAuthenticatedReq(() => userApi.usersPost(mapUserToDto(user)))
}