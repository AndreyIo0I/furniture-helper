import {Button, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/router'
import useClients from '../../../api/clients/useClients'
import useProjects, {Project} from '../../../api/projects/useProjects'
import useAccountSettings from '../../../api/useAccountSettings'
import useCurrentStage from '../../../api/useCurrentStage'
import MainLayout from '../../components/MainLayout'
import styles from './styles.module.css'

interface ProjectRow {
	id: number
	contractNumber: string
	projectType: string
	clientName?: string
	dateOfFinish: Dayjs | null
	endDate: Dayjs | null
	isCompleted: boolean
}

interface CurrentStageCellProps {
	projectId: number
}

const columns: ColumnsType<ProjectRow> = [{
	title: 'Номер договора',
	dataIndex: 'contractNumber',
	key: 'contractNumber',
	render: contractNumber => contractNumber ? contractNumber : '–',
}, {
	title: 'Продукт',
	dataIndex: 'projectType',
	key: 'projectType',
}, {
	title: 'Клиент',
	dataIndex: 'clientName',
	key: 'clientName',
}, {
	title: 'Текущий этап',
	dataIndex: 'id',
	key: 'currentStage',
	render: projectId => <CurrentStageCell projectId={projectId} />,
}, {
	title: 'Дедлайн',
	dataIndex: 'dateOfFinish',
	key: 'dateOfFinish',
	render: dateOfFinish => dateOfFinish?.format('DD.MM.YYYY'),
}]

function compareDates(lhs: Dayjs | null, rhs: Dayjs | null, options = {nullIsLess: false}): number {
	if (lhs === null && rhs === null) {
		return 0
	}
	if (lhs === null) {
		return options.nullIsLess ? -1 : 1
	}
	if (rhs === null) {
		return options.nullIsLess ? 1 : -1
	}
	return lhs.diff(rhs)
}

function compareProjects(lhs: ProjectRow, rhs: ProjectRow): number {
	const dIsCompleted = Number(lhs.isCompleted) - Number(rhs.isCompleted)
	if (dIsCompleted) {
		return dIsCompleted
	}
	if (lhs.isCompleted) {
		return compareDates(rhs.endDate, lhs.endDate, {nullIsLess: true})
	} else {
		return compareDates(lhs.dateOfFinish, rhs.dateOfFinish)
	}
}

function CurrentStageCell(props: CurrentStageCellProps) {
	const {data: currentStage} = useCurrentStage(props.projectId)
	if (!currentStage)
		return null

	return <>{
		currentStage.isCompleted && currentStage.completedOn
			? 'Оплачено: ' + dayjs(currentStage.completedOn).format('DD.MM.YYYY')
			: currentStage.name
	}</>
}

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
		dateOfFinish: project.deadLine,
		endDate: project.endDate!,
		isCompleted: !!project.isCompleted,
	})

	const projects = apiProjects ? apiProjects.map(mapToProjectRow).sort(compareProjects) : []

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
