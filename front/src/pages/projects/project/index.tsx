import {Button, Col, DatePicker, Form, Input, Row, Select, Space, Switch, Tooltip} from 'antd'
import {Dayjs} from 'dayjs'
import * as React from 'react'
import {useState} from 'react'
import useClients, {Client} from '../../../../api/clients/useClients'
import completeProject from '../../../../api/projects/completeProject'
import saveProject from '../../../../api/projects/saveProject'
import useProject from '../../../../api/projects/useProject'
import useProjectBudget, {ProjectBudget} from '../../../../api/projects/useProjectBudget'
import {Project} from '../../../../api/projects/useProjects'
import {Contract, ContractForm, saveContract} from '../../../components/Contract'
import MainLayout from '../../../components/MainLayout'
import {saveChangesWithMsg} from '../../../saveChangesWithMsg'
import endDate from '../../../../api/projects/endDate'

type ProjectFormData = {
	name: string
	address: string
	dateOfApplication: Dayjs|null
	clientId: number
	description: string
}&(ContractForm|undefined)

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
	const [isCompleted, setIsCompleted] = useState(!!project.isCompleted)
	const [withContract, setWithContract] = useState(!!project.contractNumber)

	const onSaveProject = (data: ProjectFormData) => {
		saveChangesWithMsg(async () => {
			await saveProject({
				...project,
				projectType: data.name,
				address: data.address,
				dateOfStart: data.dateOfApplication,
				clientId: data.clientId,
				description: data.description,
			})

			if (data.contractNumber) {
				await saveContract(data, project.id, budget)
			}

			if (isCompleted) {
				if (!project.endDate && !data.clientPayment2Date) {
					await endDate(project.id, new Date())
				}
				await completeProject(project.id)
			}
		})
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
							label="Продукт"
							name="name"
							rules={[{required: true, message: 'Пожалуйста, введите Продукт'}]}
						>
							<Input disabled={isCompleted}/>
						</Form.Item>
						<Form.Item
							label="Завершить"
						>
							<Tooltip
								title={'Редактирование проекта будет недоступно после завершения'}
								placement="bottom"
							>
								<Switch
									defaultChecked={isCompleted}
									onChange={setIsCompleted}
									disabled={project.isCompleted}
								/>
							</Tooltip>
						</Form.Item>
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
							disabled={isCompleted}
						/>
					</Form.Item>
					<Form.Item
						label="Дата заявки"
						name="dateOfApplication"
					>
						<DatePicker allowClear={false} disabled={isCompleted} format="DD.MM.YYYY"/>
					</Form.Item>
					<Form.Item
						label="Адрес"
						name="address"
					>
						<Input disabled={isCompleted}/>
					</Form.Item>
					<Form.Item
						label="Описание"
						name="description"
					>
						<Input.TextArea autoSize={{minRows: 4, maxRows: 10}} disabled={isCompleted}/>
					</Form.Item>
				</Col>
				<Col flex={2}>
					<Form.Item>
						{withContract
							? (
								<Contract projectId={project.id} disabled={isCompleted}/>
							)
							: (
								<Button onClick={() => setWithContract(true)} disabled={isCompleted}>
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
					disabled={!!project.isCompleted}
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
