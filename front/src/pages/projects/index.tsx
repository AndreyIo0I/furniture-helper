import {
	Button,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/router'
import useClients, {Client} from '../../../api/clients/useClients'
import useAccountSettings, {AccountSettings} from '../../../api/useAccountSettings'
import useProjects from '../../../api/useProjects'
import MainLayout from '../../components/MainLayout'
import styles from './project/styles.module.css'

interface Project {
	id: number
	name: string
	client?: Client
	dateOfFinish: Dayjs
	deadlineState?: 'red' | 'yellow'
	isCompleted: boolean
}

function getColor(diff: number, accountSettings: AccountSettings): 'red' | 'yellow' | undefined {
	if (diff < accountSettings.daysForDeadlineRed) {
		return 'red'
	}
	if (diff < accountSettings.daysForDeadlineYellow) {
		return 'yellow'
	}
	return
}

export default function ProjectsPage() {
	const router = useRouter()

	const {data: accountSettings} = useAccountSettings()

	const {data: clients} = useClients()

	const {data} = useProjects()
	const projects: Project[] = data
		? data.map(project => ({
			id: project.id!,
			name: project.name!,
			client: clients?.find(client => client.id === project.clientId),
			dateOfFinish: project.dateOfFinish,
			deadlineState: accountSettings && getColor(project.dateOfFinish.diff(dayjs(), 'days'), accountSettings),
			isCompleted: !!project.isCompleted,
		}))
		: []

	return (
		<MainLayout>
			<Container maxWidth="lg">
				<div className={styles.top}>
					{/* TODO добавить поиск */}
					{/*<TextField*/}
					{/*	margin="none"*/}
					{/*	size="small"*/}
					{/*	autoFocus*/}
					{/*	InputProps={{*/}
					{/*		startAdornment: (*/}
					{/*			<InputAdornment position="start">*/}
					{/*				<Search/>*/}
					{/*			</InputAdornment>*/}
					{/*		),*/}
					{/*	}}*/}
					{/*/>*/}
					<div></div>
					<Button
						onClick={() => router.push('/projects/new')}
						variant="contained"
					>
						Добавить новый проект
					</Button>
				</div>
				<TableContainer
					component={Paper}
					sx={{
						maxWidth: '1440px',
						margin: 'auto',
					}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Название</TableCell>
								<TableCell align="right">Клиент</TableCell>
								<TableCell align="right">Дедлайн</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{projects && projects.map(row => (
								<TableRow
									key={row.id}
									className={[
										styles.row,
										row.deadlineState === 'red' && styles.row_red,
										row.deadlineState === 'yellow' && styles.row_yellow,
									].filter(x => !!x).join(' ')}
									onClick={() => router.push(`/projects/${row.id}`)}
									style={{
										background: row.isCompleted ? 'lightgreen' : undefined,
									}}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.client?.fullName}</TableCell>
									<TableCell align="right">{row.dateOfFinish.format('DD/MM/YYYY')}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</MainLayout>
	)
}