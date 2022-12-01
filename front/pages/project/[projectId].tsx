import * as React from 'react'
import {useRouter} from 'next/router'
import MainNav from '../../src/components/MainNav'

export default function ProjectsRoute() {
	const router = useRouter()

	const projectId = router.query.projectId

	return (
		<>
			<MainNav/>
			<h1>Welcome to {projectId}</h1>
		</>
	)
}
