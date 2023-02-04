import {SWRResponse} from 'swr'
import {User} from './createUser'
import useUser from './useUser'

export default function useCurrentUser(): SWRResponse<User> {
	let currentUserId = 0
	if (typeof window !== 'undefined') {
		currentUserId = parseInt(localStorage.getItem('currentUserId')!)
	}

	return useUser(currentUserId)
}