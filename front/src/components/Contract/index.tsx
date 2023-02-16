import {Button, Card, DatePicker, Form, Input, InputNumber} from 'antd'
import * as React from 'react'

export function Contract() {

	const onSubmit = () => {
	}

	return (
		<Card title="Договор" style={{width: 400}}>
			<Form
				name="basic"
				onFinish={onSubmit}
				autoComplete="off"
				layout="vertical"
			>
				<Form.Item
					label="Номер договора"
					name="contractNumber"
				>
					<Input/>
				</Form.Item>
				<Form.Item
					label="Начало"
					name="dateOfStart"
				>
					<DatePicker/>
				</Form.Item>
				<Form.Item
					label="Конец"
					name="deadLine"
				>
					<DatePicker/>
				</Form.Item>
				<Form.Item
					label="Цена"
					name="price"
				>
					<InputNumber addonAfter="₽"/>
				</Form.Item>
				<Form.Item
					label="Предоплата"
					name="clientPayment"
				>
					<InputNumber addonAfter="₽"/>
				</Form.Item>
				<Button
					htmlType="submit"
					type="primary"
				>
					Сохранить
				</Button>
			</Form>
		</Card>
	)
}