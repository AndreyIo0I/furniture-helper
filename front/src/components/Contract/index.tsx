import {Card, DatePicker, Form, Input, InputNumber} from 'antd'
import dayjs from 'dayjs'
import * as React from 'react'
import useProject from '../../../api/projects/useProject'
import useProjectBudget from '../../../api/projects/useProjectBudget'
import useAccountSettings from '../../../api/useAccountSettings'

type ContractProps = {
	projectId: number
	disabled: boolean
}

export function Contract({projectId, disabled}: ContractProps) {
	const {data: project} = useProject(projectId)
	const {data: budget} = useProjectBudget(projectId)
	const {data: settings} = useAccountSettings()

	if (!project || !budget || !settings) {
		return null
	}

	const startDate = dayjs(budget.clientPayments[0]?.paymentDate || project.dateOfStart || dayjs())
	const endDate = project.endDate ?? (
		budget.clientPayments[1]
			? dayjs(budget.clientPayments[1].paymentDate)
			: dayjs().add(settings.defaultProjectDurationDays, 'day')
	)

	return (
		<Card title="Договор">
			<Form.Item
				label="Номер договора"
				name="contractNumber"
				rules={[{required: true}]}
				initialValue={project.contractNumber}
			>
				<Input disabled={disabled}/>
			</Form.Item>
			<Form.Item
				label="Начало"
				name="dateOfStart"
				rules={[{required: true}]}
				initialValue={startDate}
			>
				<DatePicker disabled={disabled}/>
			</Form.Item>
			<Form.Item
				label="Конец"
				name="deadLine"
				rules={[{required: true}]}
				initialValue={endDate}
			>
				<DatePicker disabled={disabled}/>
			</Form.Item>
			<Form.Item
				label="Цена"
				name="price"
				rules={[{required: true}]}
				initialValue={budget.projectCost}
			>
				<InputNumber addonAfter="₽" disabled={disabled}/>
			</Form.Item>
			<Form.Item
				label="Предоплата"
			>
				<Input.Group compact>
					<Form.Item
						name="clientPayment1"
						initialValue={budget.clientPayments[0]?.amount}
						noStyle
					>
						<InputNumber addonAfter="₽" disabled={disabled}/>
					</Form.Item>
					<Form.Item
						name="clientPayment1Date"
						initialValue={startDate}
						noStyle
					>
						<DatePicker allowClear={false} disabled={disabled}/>
					</Form.Item>
				</Input.Group>
			</Form.Item>
			<Form.Item
				label="Оплата"
			>
				<Input.Group compact>
					<Form.Item
						name="clientPayment2"
						noStyle
						initialValue={budget.clientPayments[1]?.amount}
					>
						<InputNumber addonAfter="₽" disabled={disabled}/>
					</Form.Item>
					<Form.Item
						name="clientPayment2Date"
						noStyle
						initialValue={endDate}
					>
						<DatePicker allowClear={false} disabled={disabled}/>
					</Form.Item>
				</Input.Group>
			</Form.Item>
		</Card>
	)
}