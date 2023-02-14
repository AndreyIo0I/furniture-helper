import {Button, Form, Input, Modal} from 'antd'
import React from 'react'
import createClient from '../../../api/clients/createClient'

type Form = {
	fullName: string
	source: string
	phone: string
	email: string
	description?: string
}

type NewClientPopupProps = {
	open: boolean
	onCancel: () => void
}

export default function NewClientPopup({
	open,
	onCancel,
}: NewClientPopupProps) {
	const handleOnSubmit = async (data: Form) => {
		await createClient({
			name: data.fullName,
			communicationChannel: data.source,
			phoneNumber: data.phone,
			mail: data.email,
			description: data.description,
		})
		onCancel()
	}

	return (
		<Modal title={'Создать нового клиента'} open={open} onCancel={onCancel} footer={null} centered>
			<Form
				name="basic"
				labelCol={{span: 8}}
				style={{maxWidth: 600}}
				initialValues={{remember: true}}
				onFinish={handleOnSubmit}
				autoComplete="off"
				layout="vertical"
			>
				<Form.Item
					label="ФИО"
					name="fullName"
					rules={[{required: true, message: 'Пожалуйста, введите ФИО'}]}
					required
				>
					<Input/>
				</Form.Item>

				<Form.Item
					label="Канал привлечения"
					name="source"
				>
					<Input/>
				</Form.Item>

				<Form.Item
					label="Телефон"
					name="phone"
				>
					<Input/>
				</Form.Item>

				<Form.Item
					label="Почта"
					name="email"
				>
					<Input/>
				</Form.Item>

				<Form.Item
					label="Описание"
					name="description"
				>
					<Input.TextArea/>
				</Form.Item>

				<Form.Item wrapperCol={{offset: 8, span: 16}}>
					<Button type="primary" htmlType="submit">
						Создать
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}