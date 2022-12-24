import MainNav from '../MainNav'
import ProjectSecondaryNav from '../ProjectSecondaryNav'

interface ProjectBudgetPageProps {
	projectId: string,
}

export default function ProjectBudgetPage(props: ProjectBudgetPageProps) {
	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<h1>Welcome to budget of {props.projectId}</h1>
		</>
	)
}
