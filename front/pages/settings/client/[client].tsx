import * as React from 'react'
import {useRouter} from 'next/router'
import MainNav from '../../../src/components/MainNav'
import ClientPageId from '../../../src/components/ClientPageId'

export default function ClientIdRoute() {
	const router = useRouter()

	const client = router.query.client as string

	return (
		<>
			<MainNav/>
			<ClientPageId/>
		</>
	)
}

