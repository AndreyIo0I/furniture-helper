import {Button, DatePicker, Form, Input, Select, Space} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useState} from 'react'
import useClients from '../../../../api/clients/useClients'
import createProject from '../../../../api/projects/createProject'
import MainLayout from '../../../components/MainLayout'
import NewClientPopup from '../../../components/NewClientPopup'

type ProjectFormData = {
	name: string
	address: string
	dateOfApplication: Dayjs
	clientId: number
	description: string
}

export default function NewProjectPage() {
	const router = useRouter()

	const [isNewClientPopupOpen, setIsNewClientPopupOpen] = useState(false)

	const {data: clients, mutate: updateClients} = useClients()

	const createNewProject = async (data: ProjectFormData) => {
		const newProjectId = await createProject({
			projectType: data.name,
			address: data.address,
			dateOfApplication: data.dateOfApplication.toISOString(),
			clientId: data.clientId,
			description: data.description || '',
		})
		await router.push(`/projects/${encodeURIComponent(newProjectId)}`)
	}

	return (
		<MainLayout>
			<Form
				name="basic"
				style={{maxWidth: 800}}
				initialValues={{
					dateOfApplication: dayjs(),
				}}
				onFinish={createNewProject}
				autoComplete="off"
				layout="vertical"
			>
				<Form.Item
					label="Тип проекта"
					name="name"
					rules={[{required: true, message: 'Пожалуйста, укажите тип проекта'}]}
				>
					<Input autoFocus/>
				</Form.Item>
				<Space>
					<Form.Item
						label="Клиент"
						name="clientId"
						style={{width: '200px'}}
						rules={[{required: true, message: 'Пожалуйста, укажите клиента'}]}
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
						/>
					</Form.Item>
					<Button
						onClick={() => setIsNewClientPopupOpen(true)}
						type="primary"
					>
						Добавить клиента
					</Button>
				</Space>
				<Form.Item
					label="Дата заявки"
					name="dateOfApplication"
					rules={[{required: true}]}
				>
					<DatePicker allowClear={false}/>
				</Form.Item>
				<Form.Item
					label="Адрес"
					name="address"
					rules={[{required: true, message: 'Пожалуйста, укажите адрес'}]}
				>
					<Input/>
				</Form.Item>
				<Form.Item
					label="Описание"
					name="description"
				>
					<Input.TextArea autoSize={{minRows: 4, maxRows: 10}}/>
				</Form.Item>
				<Button
					htmlType="submit"
					type="primary"
				>
					Создать
				</Button>
			</Form>
			<NewClientPopup
				open={isNewClientPopupOpen}
				onCancel={() => {
					updateClients()
					setIsNewClientPopupOpen(false)
				}}
			/>
		</MainLayout>
	)
}