import * as React from 'react'
import {useRouter} from 'next/router'
import MainNav from '../../../src/components/MainNav'
import ProjectSecondaryNav from '../../../src/components/ProjectSecondaryNav'

export default function ProjectsRoute() {
	const router = useRouter()

	const projectId = router.query.projectId as string

	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={projectId}/>
			<h1>Welcome to budget of {projectId}</h1>
		</>
	)
}