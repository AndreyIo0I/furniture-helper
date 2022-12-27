import styles from './styles.module.css'
import Link from '../Link'
import {useRouter} from 'next/router'

interface Tab {
	text: string;
	link: string;
}

interface SecondaryNavProps {
	items: Tab[];
}

export default function SecondaryNav(props: SecondaryNavProps) {
	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{props.items.map(item => (
					<Link
						key={item.link}
						href={item.link}
						underline={router.asPath === item.link ? 'always' : 'none'}
					>
						{item.text}
					</Link>
				))}
			</div>
		</div>
	)
}