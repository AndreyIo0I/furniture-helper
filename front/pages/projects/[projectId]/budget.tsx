import {useRouter} from 'next/router'
import ProjectBudgetPage from '../../../src/pages/projects/project/budget'

export default function ProjectBudgetRoute() {
	const router = useRouter()

	const projectId = parseInt(router.query.projectId as string)

	if (isNaN(projectId))
		return null

	return <ProjectBudgetPage projectId={projectId}/>
}
