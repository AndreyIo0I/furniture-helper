import {Search} from '@mui/icons-material'
import {
	Button,
	Container,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import {useRouter} from 'next/router'
import useClients from '../../../api/useClients'
import useProjects from '../../../api/useProjects'
import MainNav from '../../components/MainNav'
import styles from './project/styles.module.css'

interface Client {
	name: string;
}

interface Project {
	id: number;
	name: string;
	client: Client;
	deadline: Date;
	deadlineState?: 'red' | 'yellow';
}

export default function ProjectsPage() {
	const router = useRouter()

	const {data: clients} = useClients()

	const {data} = useProjects()
	const projects: Project[] = data
		? data.map(project => ({
			id: project.id!,
			name: project.name!,
			client: {
				name: clients?.find(client => client.id === project.clientId)?.fullName || '...',
			},
			deadline: new Date(project.deadLine!),
		}))
		: []

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				<div className={styles.top}>
					<TextField
						margin="none"
						size="small"
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search/>
								</InputAdornment>
							),
						}}
					/>
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
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.client.name}</TableCell>
									<TableCell align="right">{row.deadline.toDateString()}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}