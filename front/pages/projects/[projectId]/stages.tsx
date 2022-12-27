import {useRouter} from 'next/router'
import ProjectStagesPage from '../../../src/pages/projects/project/stages'

export default function ProjectStagesRoute() {
	const router = useRouter()

	const projectId = router.query.projectId as string

	return <ProjectStagesPage projectId={projectId}/>
}
