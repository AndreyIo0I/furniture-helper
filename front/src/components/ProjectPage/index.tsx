import MainNav from '../MainNav'
import ProjectSecondaryNav from '../ProjectSecondaryNav'

interface ProjectPageProps {
	projectId: string,
}

export default function ProjectPage(props: ProjectPageProps) {
	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<h1>Welcome to {props.projectId}</h1>
		</>
	)
}
