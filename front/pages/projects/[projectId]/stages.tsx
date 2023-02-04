import {useRouter} from 'next/router'
import ProjectStagesPage from '../../../src/pages/projects/project/stages'

export default function ProjectStagesRoute() {
	const router = useRouter()

	const projectId = parseInt(router.query.projectId as string)

	if (isNaN(projectId))
		return null

	return <ProjectStagesPage projectId={projectId}/>
}
