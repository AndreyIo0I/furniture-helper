import * as React from 'react'
import styles from './styles.module.css'
import Link from '../Link'
import {useRouter} from 'next/router'
import Typography from '@mui/material/Typography/Typography'
import Logout from '@mui/icons-material/Logout'
import {useRef, useState} from 'react'
import Menu from '@mui/material/Menu/Menu'
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon'
import MenuItem from '@mui/material/MenuItem/MenuItem'

type TabType = 'projects'|'analytics'|'settings'

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
}]

function AccountButton() {
	const userEmail = 'user@gmail.com'

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
				<Typography>{userEmail}</Typography>
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
				<MenuItem autoFocus={false}>
					<Link href={'/login'}>
						<ListItemIcon>
							<Logout fontSize="small"/>
						</ListItemIcon>
						Выход
					</Link>
				</MenuItem>
			</Menu>
		</>
	)
}

export default function MainNav() {
	const router = useRouter()

	return (
		<div className={styles.container}>
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
	)
}