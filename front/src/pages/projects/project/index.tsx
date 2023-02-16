import {Button, DatePicker, Form, Input, Select, Space} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import * as React from 'react'
import {useState} from 'react'
import useClients, {Client} from '../../../../api/clients/useClients'
import completeProject from '../../../../api/projects/completeProject'
import saveProject from '../../../../api/projects/saveProject'
import useProject from '../../../../api/projects/useProject'
import {Project} from '../../../../api/projects/useProjects'
import {Contract} from '../../../components/Contract'
import MainLayout from '../../../components/MainLayout'

type ProjectFormData = {
	name: string
	address: string
	dateOfStart: Dayjs | null
	clientId: number
	description: string
}

interface ContentProps {
	project: Project
	clients: Client[]
}

function Content({
	project,
	clients,
}: ContentProps) {
	const [isCompleted, setIsCompleted] = useState(project.isCompleted)

	const onCompleteProject = async () => {
		// что с не сохраненными изменениями?
		setIsCompleted(true)
		await completeProject(project.id) // TODO: добавить "вы уверены?"
	}

	const onSaveProject = async (data: ProjectFormData) => {
		await saveProject({
			id: project.id,
			contractNumber: project.contractNumber,
			dateOfFinish: project.dateOfFinish,
			projectType: data.name,
			address: data.address,
			dateOfStart: data.dateOfStart,
			clientId: data.clientId,
			description: data.description,
		})
	}

	return (
		<Space size={'large'}>
			<Form
				name="basic"
				style={{width: '100%', minWidth: 500, maxWidth: 800}}
				initialValues={{
					name: project.projectType,
					clientId: project.clientId,
					address: project.address,
					description: project.description,
					dateOfApplication: dayjs(),
				}}
				onFinish={onSaveProject}
				autoComplete="off"
				layout="vertical"
			>
				<Space>
					<Form.Item
						label="Тип проекта"
						name="name"
						rules={[{required: true, message: 'Пожалуйста, введите тип проекта'}]}
					>
						<Input autoFocus/>
					</Form.Item>
					<Button
						onClick={() => onCompleteProject()}
						type="primary"
						disabled={project.isCompleted}
					>
						Завершить
					</Button>
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
				<Button
					htmlType="submit"
					type="primary"
					disabled={project.isCompleted}
				>
					Сохранить
				</Button>
			</Form>
			<Contract/>
		</Space>
	)
}

interface ProjectPageProps {
	projectId: number
}

export default function ProjectPage(props: ProjectPageProps) {
	const {data: project} = useProject(props.projectId)
	const {data: clients} = useClients()

	return (
		<MainLayout projectId={props.projectId}>
			{project && clients && <Content project={project} clients={clients}/>}
		</MainLayout>
	)
}
