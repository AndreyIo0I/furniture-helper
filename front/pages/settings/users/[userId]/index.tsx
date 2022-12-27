import {useRouter} from 'next/router'
import * as React from 'react'
import UserPage from '../../../../src/pages/settings/users/user'

export default function UserIdRoute() {
	const router = useRouter()

	// noinspection JSUnusedLocalSymbols
	const userId = router.query.userId as string

	return (
		<UserPage/>
	)
}

