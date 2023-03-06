import {Button, DatePicker, Form, FormInstance, Input, Select, Space} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useRef, useState} from 'react'
import useClients, {Client} from '../../../../api/clients/useClients'
import createProject from '../../../../api/projects/createProject'
import MainLayout from '../../../components/MainLayout'
import NewClientPopup from '../../../components/NewClientPopup'
import {saveChangesWithMsg} from '../../../saveChangesWithMsg'

type ProjectFormData = {
	name: string
	address: string
	dateOfApplication: Dayjs
	clientId: number
	description: string
}

function Content({
	clients,
	updateClients,
}: {
	clients: Client[]
	updateClients: () => void
}) {
	const formRef = useRef<FormInstance>(null)
	const router = useRouter()

	const [isNewClientPopupOpen, setIsNewClientPopupOpen] = useState(false)

	const clientOptions = clients?.map(client => ({
		label: client.fullName,
		value: client.id,
	}))

	const createNewProject = (data: ProjectFormData) =>
		saveChangesWithMsg(async () => {
			const newProjectId = await createProject({
				projectType: data.name,
				address: data.address,
				dateOfApplication: data.dateOfApplication.toISOString(),
				clientId: data.clientId,
				description: data.description || '',
			})
			await router.push(`/projects/${encodeURIComponent(newProjectId)}`)
		})

	return (
		<>
			<Form
				ref={formRef}
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
					label="Продукт"
					name="name"
					rules={[{required: true, message: 'Пожалуйста, укажите Продукт'}]}
				>
					<Input autoFocus/>
				</Form.Item>
				<Space>
					<Form.Item
						label="Клиент"
						style={{width: '200px'}}
						name="clientId"
						rules={[{required: true, message: 'Пожалуйста, укажите клиента'}]}
					>
						<Select
							showSearch
							filterOption={(input, option) =>
								(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
							}
							options={clientOptions}
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
					<DatePicker allowClear={false} format="DD.MM.YYYY"/>
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
				onCancel={async clientId => {
					if (typeof clientId === 'number') {
						await updateClients()
						formRef.current?.setFieldValue('clientId', clientId)
					}
					setIsNewClientPopupOpen(false)
				}}
			/>
		</>
	)
}

export default function NewProjectPage() {
	const {data: clients, mutate: updateClients} = useClients()

	return (
		<MainLayout>
			{clients && <Content clients={clients} updateClients={updateClients}/>}
		</MainLayout>
	)
}