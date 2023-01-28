import {Button, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/router'
import React from 'react'
import useClients, {Client} from '../../../api/clients/useClients'
import useAccountSettings, {AccountSettings} from '../../../api/useAccountSettings'
import useProjects from '../../../api/projects/useProjects'
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

interface Columns {
	name: string
	client?: Client
	dateOfFinish: Dayjs
}

const columns: ColumnsType<Columns> = [{
	title: 'Название',
	dataIndex: 'name',
	key: 'name',
}, {
	title: 'Клиент',
	dataIndex: 'client',
	key: 'client',
	render: client => client?.fullName,
}, {
	title: 'Дедлайн',
	dataIndex: 'dateOfFinish',
	key: 'dateOfFinish',
	render: dateOfFinish => dateOfFinish.format('DD/MM/YYYY'),
}]

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
			<div className={styles.top}>
				<div></div>
				<Button
					onClick={() => router.push('/projects/new')}
					type="primary"
				>
					Добавить новый проект
				</Button>
			</div>
			<Table
				rowKey="id"
				rowClassName={(_, index) => [
					styles.row,
					projects[index].deadlineState === 'red' && styles.row_red,
					projects[index].deadlineState === 'yellow' && styles.row_yellow,
					projects[index].isCompleted && styles.row_completed,
				].filter(x => !!x).join(' ')}
				columns={columns}
				dataSource={projects}
				pagination={false}
				onRow={(_, index) => {
					return {
						onClick: () => router.push(`/projects/${projects[index!].id}`),
					}
				}}
			/>
		</MainLayout>
	)
}