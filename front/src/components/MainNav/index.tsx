import {useRef, useState} from 'react'
import styles from './styles.module.css'
import Link from '../Link'
import {useRouter} from 'next/router'
import {Logout} from '@mui/icons-material'
import {ListItemIcon, Menu, MenuItem, Typography} from '@mui/material'

type TabType = 'projects' | 'analytics' | 'settings' | 'costs'

interface Tab {
	id: TabType;
	name: string;
	link: string;
}

const tabs: Tab[] = [{
	id: 'projects',
	name: 'Проекты',
	link: '/projects',
}, {
	id: 'analytics',
	name: 'Аналитика',
	link: '/analytics',
}, {
	id: 'settings',
	name: 'Настройки',
	link: '/settings',
}, {
	id: 'costs',
	name: 'Издержки',
	link: '/costs',
}]

function AccountButton() {
	const userEmail = 'user@gmail.com'
	const router = useRouter()

	const ref = useRef<HTMLDivElement>(null)
	const [open, setOpen] = useState(false)

	return (
		<>
			<div
				ref={ref}
				onClick={() => {
					setOpen(true)
				}}
			>
				<Typography className={styles.userEmail}>{userEmail}</Typography>
			</div>
			<Menu
				id="basic-menu"
				anchorEl={ref.current!}
				open={open}
				onClose={() => {
					setOpen(false)
				}}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					autoFocus={false}
					onClick={() => router.push('/login')}
				>
					<ListItemIcon>
						<Logout fontSize="small"/>
					</ListItemIcon>
					Выход
				</MenuItem>
			</Menu>
		</>
	)
}

export default function MainNav() {
	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{tabs.map(tab => (
					<Link
						key={tab.id}
						href={tab.link}
						underline={router.route === tab.link ? 'always' : 'none'}
					>
						{tab.name}
					</Link>
				))}
				<AccountButton/>
			</div>
		</div>
	)
}
