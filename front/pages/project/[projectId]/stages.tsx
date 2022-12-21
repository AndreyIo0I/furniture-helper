import {useRouter} from 'next/router'
import ProjectStagesPage from '../../../src/components/ProjectStagesPage'

export default function ProjectStagesRoute() {
	const router = useRouter()

	const projectId = router.query.projectId

	return <ProjectStagesPage projectId={projectId}/>
}
