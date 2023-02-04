import {useRouter} from 'next/router'
import ProjectAnalyticsPage from '../../../src/pages/projects/project/analytics'

export default function ProjectAnalyticsRoute() {
	const router = useRouter()

	const projectId = parseInt(router.query.projectId as string)

	if (isNaN(projectId))
		return null

	return <ProjectAnalyticsPage projectId={projectId}/>
}
