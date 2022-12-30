import {Logout, ArrowBackIosNew} from '@mui/icons-material'
import {IconButton, ListItemIcon, Menu, MenuItem, Typography} from '@mui/material'
import {useRouter} from 'next/router'
import {useRef, useState} from 'react'
import useCurrentUser from '../../../api/users/useCurrentUser'
import Link from '../Link'
import styles from './styles.module.css'

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
	name: 'Общие издержки',
	link: '/costs',
}]

function AccountButton() {
	const {data: currentUser} = useCurrentUser()
	const userEmail = currentUser?.email
	const router = useRouter()

	const ref = useRef<HTMLDivElement>(null)
	const [open, setOpen] = useState(false)

	const onLogout = async () => {
		await fetch('/api/logout', {method: 'POST'})
		await router.push('/login')
	}

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
					onClick={onLogout}
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
				<IconButton
					onClick={() => router.back()}
				>
					<ArrowBackIosNew/>
				</IconButton>
				{tabs.map(tab => (
					<Link
						key={tab.id}
						href={tab.link}
						underline={router.asPath === tab.link ? 'always' : 'none'}
					>
						{tab.name}
					</Link>
				))}
				<AccountButton/>
			</div>
		</div>
	)
}
