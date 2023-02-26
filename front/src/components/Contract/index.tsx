import {Card, DatePicker, Form, Input, InputNumber} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import contractNumber from '../../../api/projects/contractNumber'
import deadline from '../../../api/projects/deadline'
import endDate from '../../../api/projects/endDate'
import saveProjectBudget from '../../../api/projects/saveProjectBudget'
import startDate from '../../../api/projects/startDate'
import useProject from '../../../api/projects/useProject'
import useProjectBudget, {ClientPayment, ProjectBudget} from '../../../api/projects/useProjectBudget'
import useAccountSettings from '../../../api/useAccountSettings'

export interface ContractForm {
	contractNumber: string
	dateOfStart: Dayjs | null
	deadLine: Dayjs | null
	price: number | null
	clientPayment1?: number | null
	clientPayment1Date: Dayjs
	clientPayment2?: number | null
	clientPayment2Date: Dayjs
}

export async function saveBudget(data: ContractForm, projectId: number, budget: ProjectBudget) {
	const clientPayments: ClientPayment[] = []

	if (data.clientPayment1 || data.clientPayment2) {
		clientPayments.push({
			amount: data.clientPayment1 || 0,
			paymentDate: data.clientPayment1Date.toDate(),
		})
	}
	if (data.clientPayment2) {
		clientPayments.push({
			amount: data.clientPayment2,
			paymentDate: data.clientPayment2Date.toDate(),
		})

		await endDate(projectId, data.clientPayment2Date.toDate())
	}
	await saveProjectBudget({
		...budget,
		projectCost: data.price!,
		clientPayments,
	})
}

export function saveContract(data: ContractForm, projectId: number, budget: ProjectBudget) {
	return Promise.all([
		contractNumber(projectId, data.contractNumber),
		startDate(projectId, data.dateOfStart!.toDate()),
		deadline(projectId, data.deadLine!.toDate()),
		saveBudget(data, projectId, budget),
	])
}

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