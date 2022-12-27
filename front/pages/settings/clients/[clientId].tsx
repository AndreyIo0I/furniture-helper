import * as React from 'react'
import {useRouter} from 'next/router'
import ClientPage from '../../../src/pages/settings/clients/client'

export default function ClientIdRoute() {
	const router = useRouter()

	// noinspection JSUnusedLocalSymbols
	const clientId = router.query.clientId as string

	return (
		<ClientPage/>
	)
}

