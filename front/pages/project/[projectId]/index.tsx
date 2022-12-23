import {useRouter} from 'next/router'
import ProjectPage from '../../../src/components/ProjectPage'

export default function ProjectIdRoute() {
	const router = useRouter()

	const projectId = router.query.projectId as string

	return <ProjectPage projectId={projectId}/>
}
