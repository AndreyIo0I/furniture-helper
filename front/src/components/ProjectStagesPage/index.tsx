import MainNav from '../MainNav'
import ProjectSecondaryNav from '../ProjectSecondaryNav'

interface ProjectStagesPageProps {
	projectId: string,
}

export default function ProjectStagesPage(props: ProjectStagesPageProps) {
	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
		</>
	)
}
