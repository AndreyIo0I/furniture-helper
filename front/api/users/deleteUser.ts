import {userApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function deleteUser(id: number): Promise<number> {
	return makeAuthenticatedReq(() => userApi.usersIdDelete(id))
}