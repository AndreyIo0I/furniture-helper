import {Button, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/router'
import useClients from '../../../api/clients/useClients'
import useAccountSettings from '../../../api/useAccountSettings'
import useProjects, {Project} from '../../../api/projects/useProjects'
import MainLayout from '../../components/MainLayout'
import styles from './styles.module.css'

interface ProjectRow {
	id: number
	contractNumber: string
	projectType: string
	clientName?: string
	dateOfFinish: Dayjs | null
	isCompleted: boolean
}

const columns: ColumnsType<ProjectRow> = [{
	title: 'Номер договора',
	dataIndex: 'contractNumber',
	key: 'contractNumber',
	render: contractNumber => contractNumber ? contractNumber : '–',
}, {
	title: 'Тип проекта',
	dataIndex: 'projectType',
	key: 'projectType',
}, {
	title: 'Клиент',
	dataIndex: 'clientName',
	key: 'clientName',
}, {
	title: 'Дедлайн',
	dataIndex: 'dateOfFinish',
	key: 'dateOfFinish',
	render: dateOfFinish => dateOfFinish?.format('DD/MM/YYYY'),
}]

export default function ProjectsPage() {
	const router = useRouter()

	const {data: accountSettings} = useAccountSettings()
	const {data: clients} = useClients()
	const {data: apiProjects} = useProjects()

	const mapToProjectRow = (project: Project): ProjectRow => ({
		id: project.id,
		contractNumber: project.contractNumber,
		projectType: project.projectType,
		clientName: clients?.find(client => client.id === project.clientId)?.fullName,
		dateOfFinish: project.dateOfFinish,
		isCompleted: !!project.isCompleted,
	})

	const projects = apiProjects ? apiProjects.map(mapToProjectRow) : []

	function toRowStyle(project: ProjectRow): string {
		if (project.isCompleted) {
			return `${styles.row} ${styles.row_completed}`
		}
		if (project.dateOfFinish !== null && accountSettings !== undefined) {
			const daysLeft = project.dateOfFinish.diff(dayjs(), 'days')
			if (daysLeft < accountSettings.daysForDeadlineRed) {
				return `${styles.row} ${styles.row_red}`
			}
			if (daysLeft < accountSettings.daysForDeadlineYellow) {
				return `${styles.row} ${styles.row_yellow}`
			}
		}
		return styles.row
	}

	return (
		<MainLayout>
			<Button
				type="primary"
				className={styles.new_project_button}
				onClick={() => router.push('/projects/new')}
			>
				Добавить новый проект
			</Button>
			<Table
				rowKey="id"
				rowClassName={toRowStyle}
				columns={columns}
				dataSource={projects}
				pagination={false}
				onRow={record => ({
					onClick: () => router.push(`/projects/${record.id}`),
				})}
			/>
		</MainLayout>
	)
}
