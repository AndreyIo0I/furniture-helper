
import styles from './styles.module.css'

interface MarginProps {
	text: string
}

export default function Margin(props: MarginProps) {
	return (
		<div className={styles.container}>
			{props.text}
		</div>
	)
}
