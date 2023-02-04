import {useRouter} from 'next/router'
import * as React from 'react'
import UserPage from '../../../../src/pages/settings/users/user'

export default function UserIdRoute() {
	const router = useRouter()

	const userId = parseInt(router.query.userId as string)

	if (isNaN(userId))
		return null

	return <UserPage userId={userId}/>
}

