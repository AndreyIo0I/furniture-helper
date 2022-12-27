import {useRouter} from 'next/router'
import ProjectBudgetPage from '../../../src/pages/projects/project/budget'

export default function ProjectBudgetRoute() {
	const router = useRouter()

	const projectId = router.query.projectId as string

	return <ProjectBudgetPage projectId={projectId}/>
}
