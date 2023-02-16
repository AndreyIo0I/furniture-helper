import {Card, DatePicker, Form, Input, InputNumber} from 'antd'
import * as React from 'react'

export function Contract() {
	return (
		<Card title="Договор" style={{width: 400}}>
			<Form.Item
				label="Номер договора"
				name="contractNumber"
				rules={[{required: true}]}
			>
				<Input/>
			</Form.Item>
			<Form.Item
				label="Начало"
				name="dateOfStart"
				rules={[{required: true}]}
			>
				<DatePicker/>
			</Form.Item>
			<Form.Item
				label="Конец"
				name="deadLine"
				rules={[{required: true}]}
			>
				<DatePicker/>
			</Form.Item>
			<Form.Item
				label="Цена"
				name="price"
				rules={[{required: true}]}
			>
				<InputNumber addonAfter="₽"/>
			</Form.Item>
			<Form.Item
				label="Предоплата"
				name="clientPayment"
				rules={[{required: true}]}
			>
				<InputNumber addonAfter="₽"/>
			</Form.Item>
		</Card>
	)
}