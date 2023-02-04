import {useRouter} from 'next/router'
import ProjectPage from '../../../src/pages/projects/project'

export default function ProjectIdRoute() {
	const router = useRouter()

	const projectId = parseInt(router.query.projectId as string)

	if (isNaN(projectId))
		return null

	return <ProjectPage projectId={projectId}/>
}
