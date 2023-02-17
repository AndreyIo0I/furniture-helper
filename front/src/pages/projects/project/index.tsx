import {Button, Col, DatePicker, Form, Input, message, Popconfirm, Row, Select, Space} from 'antd'
import {Dayjs} from 'dayjs'
import * as React from 'react'
import {useState} from 'react'
import useClients, {Client} from '../../../../api/clients/useClients'
import completeProject from '../../../../api/projects/completeProject'
import contractNumber from '../../../../api/projects/contractNumber'
import deadline from '../../../../api/projects/deadline'
import endDate from '../../../../api/projects/endDate'
import saveProject from '../../../../api/projects/saveProject'
import saveProjectBudget from '../../../../api/projects/saveProjectBudget'
import startDate from '../../../../api/projects/startDate'
import useProject from '../../../../api/projects/useProject'
import useProjectBudget, {ClientPayment, ProjectBudget} from '../../../../api/projects/useProjectBudget'
import {Project} from '../../../../api/projects/useProjects'
import {Contract} from '../../../components/Contract'
import MainLayout from '../../../components/MainLayout'

type ProjectFormData = {
	name: string
	address: string
	dateOfApplication: Dayjs|null
	clientId: number
	description: string
} & ({
	contractNumber: string
	dateOfStart: Dayjs
	deadLine: Dayjs
	price: number
	clientPayment1?: number
	clientPayment1Date: Dayjs
	clientPayment2?: number
	clientPayment2Date: Dayjs
} | undefined)

interface ContentProps {
	project: Project
	clients: Client[]
	budget: ProjectBudget
}

function Content({
	project,
	clients,
	budget,
}: ContentProps) {
	const [isCompleted, setIsCompleted] = useState(project.isCompleted)
	const [withContract, setWithContract] = useState(!!project.contractNumber)

	const onSaveProject = async (data: ProjectFormData) => {
		await saveProject({
			...project,
			projectType: data.name,
			address: data.address,
			dateOfStart: data.dateOfApplication,
			clientId: data.clientId,
			description: data.description,
		})

		if (data.contractNumber) {
			const clientPayments: ClientPayment[] = []

			if (data.clientPayment1) {
				clientPayments.push({
					amount: data.clientPayment1,
					paymentDate: data.clientPayment1Date.toDate(),
				})
			}
			if (data.clientPayment2) {
				clientPayments.push({
					amount: data.clientPayment2,
					paymentDate: data.clientPayment2Date.toDate(),
				})
			}

			await Promise.all([
				contractNumber(project.id, data.contractNumber),
				startDate(project.id, data.dateOfStart.toDate()),
				deadline(project.id, data.deadLine.toDate()),
				data.clientPayment2 && endDate(project.id, data.clientPayment2Date.toDate()),
				saveProjectBudget({
					...budget,
					projectCost: data.price,
					clientPayments: clientPayments,
				}),
			])
		}

		if (isCompleted) {
			await completeProject(project.id)
		}
		message.success('Изменения успешно сохранены')
	}

	return (
		<Form
			name="basic"
			initialValues={{
				name: project.projectType,
				clientId: project.clientId,
				dateOfApplication: project.dateOfApplication,
				address: project.address,
				description: project.description,
			}}
			onFinish={onSaveProject}
			autoComplete="off"
			layout="vertical"
		>
			<Row gutter={[48, 16]}>
				<Col flex={4}>
					<Space>
						<Form.Item
							label="Тип проекта"
							name="name"
							rules={[{required: true, message: 'Пожалуйста, введите тип проекта'}]}
						>
							<Input autoFocus/>
						</Form.Item>
						<Popconfirm
							placement="right"
							title={'Редактирование проекта будет недоступно после завершения'}
							onConfirm={() => setIsCompleted(true)}
							okText="Завершить"
							cancelText="Отмена"
						>
							<Button
								type="primary"
								disabled={project.isCompleted}
							>
								Завершить
							</Button>
						</Popconfirm>
					</Space>
					<Form.Item
						label="Клиент"
						name="clientId"
						style={{width: '200px'}}
					>
						<Select
							showSearch
							filterOption={(input, option) =>
								(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
							}
							options={clients?.map(client => ({
								label: client.fullName,
								value: client.id,
							}))}
							disabled={project.isCompleted}
						/>
					</Form.Item>
					<Form.Item
						label="Дата заявки"
						name="dateOfApplication"
					>
						<DatePicker allowClear={false} disabled={project.isCompleted}/>
					</Form.Item>
					<Form.Item
						label="Адрес"
						name="address"
					>
						<Input disabled={project.isCompleted}/>
					</Form.Item>
					<Form.Item
						label="Описание"
						name="description"
					>
						<Input.TextArea autoSize={{minRows: 4, maxRows: 10}} disabled={project.isCompleted}/>
					</Form.Item>
				</Col>
				<Col flex={2}>
					<Form.Item>
						{withContract
							? (
								<Contract projectId={project.id}/>
							)
							: (
								<Button onClick={() => setWithContract(true)}>
									Добавить договор
								</Button>
							)}
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Button
					htmlType="submit"
					type="primary"
					disabled={project.isCompleted}
				>
					Сохранить
				</Button>
			</Row>
		</Form>
	)
}

interface ProjectPageProps {
	projectId: number
}

export default function ProjectPage(props: ProjectPageProps) {
	const {data: project} = useProject(props.projectId)
	const {data: clients} = useClients()
	const {data: budget} = useProjectBudget(props.projectId)

	return (
		<MainLayout projectId={props.projectId}>
			{project && clients && budget && <Content project={project} clients={clients} budget={budget}/>}
		</MainLayout>
	)
}
