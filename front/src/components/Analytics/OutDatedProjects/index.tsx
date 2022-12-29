
import styles from './styles.module.css'

export interface OutDatedProjectsProps {
	text: string
}

export function OutDatedProjects(props: OutDatedProjectsProps) {
	return (
		<div className={styles.container}>
			{props.text}
		</div>
	)
}
