import * as React from 'react'
import useCurrentUser from '../../../api/users/useCurrentUser'
import UserPage from '../../../src/pages/settings/users/user'

export default function ProfileRoute() {
	const {data: currentUser} = useCurrentUser()

	if (!currentUser)
		return null

	return (
		<UserPage userId={currentUser.id}/>
	)
}