import {useRouter} from 'next/router'
import * as React from 'react'
import ClientPage from '../../src/pages/clients/client'

export default function ClientIdRoute() {
	const router = useRouter()

	const clientId = parseInt(router.query.clientId as string)

	if (isNaN(clientId))
		return null

	return (
		<ClientPage clientId={clientId}/>
	)
}

