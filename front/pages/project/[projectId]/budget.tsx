import {useRouter} from 'next/router'
import ProjectBudgetPage from '../../../src/components/ProjectBudgetPage'

export default function ProjectBudgetRoute() {
	const router = useRouter()

	const projectId = router.query.projectId as string

	return <ProjectBudgetPage projectId={projectId}/>
}
