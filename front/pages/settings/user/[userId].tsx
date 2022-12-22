import * as React from 'react'
import {useRouter} from 'next/router'
import UserPage from '../../../src/components/UserPage'

export default function UserIdRoute() {
	const router = useRouter()

	// noinspection JSUnusedLocalSymbols
	const userId = router.query.userId as string

	return (
		<UserPage/>
	)
}

