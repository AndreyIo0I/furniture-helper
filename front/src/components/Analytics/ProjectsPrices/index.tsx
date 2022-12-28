
import styles from './styles.module.css'

export interface ProjectsPricesProps {
	dateOfStart: string,
	endDate: string
}

export function ProjectsPrices(props: ProjectsPricesProps) {
	return (
		<div className={styles.container}>
			ProjectPricesProps: {props.dateOfStart} === {props.endDate}
		</div>
	)
}
