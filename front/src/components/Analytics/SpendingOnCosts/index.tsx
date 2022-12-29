
import styles from './styles.module.css'

interface SpendingOnCostsProps {
	text: string
}

export default function SpendingOnCosts(props: SpendingOnCostsProps) {
	return (
		<div className={styles.container}>
			{props.text}
		</div>
	)
}
