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
import useProjects from '../../../api/useProjects'
import MainNav from '../MainNav'
import styles from './styles.module.css'

interface Client {
	name: string;
}

interface Project {
	id: string;
	name: string;
	client: Client;
	deadline: Date;
	deadlineState?: 'red' | 'yellow';
}

const rows: Project[] = [{
	id: '1',
	name: 'Диван',
	client: {
		name: 'Васнецов С.В.',
	},
	deadline: new Date('2022-02-08'),
	deadlineState: 'red',
}, {
	id: '2',
	name: 'Стол',
	client: {
		name: 'Наталья В.Ф.',
	},
	deadline: new Date('2022-02-08'),
	deadlineState: 'yellow',
}, {
	id: '3',
	name: 'ул.Чехова 1-1, 1под, 1этаж',
	client: {
		name: 'Елена Т.Ч.',
	},
	deadline: new Date('2022-02-08'),
}]

export default function ProjectsPage() {
	const router = useRouter()

	const {data, error, isLoading} = useProjects()
	const projects = data && data.map(project => ({
		id: project.id,
		name: project.name,
		client: {
			name: 'TODO: загрузить клиента',
		},
		deadline: new Date(project.deadLine!),
		deadlineState: 'normal',
	}))
	console.log('useProjects: ', {data, error, isLoading})

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
									onClick={() => router.push(`/project/${row.id}`)}
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