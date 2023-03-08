import {DatePicker, Form, Input, InputNumber, Typography} from 'antd'
import {Dayjs} from 'dayjs'
import {ProjectBudget} from '../../../../../api/projects/useProjectBudget'
import saveStage from '../../../../../api/saveStage'
import {saveBudget} from '../../../../components/Contract'
import {CommonStageFields, getPopupContainer, mapToApiStage} from './common'
import * as model from './model'

export async function savePaymentStage(
	stage: model.PaymentStage,
	contract: model.Contract,
	projectId: number,
	apiBudget: ProjectBudget,
) {
	if (contract.form) {
		await saveBudget(contract.form, projectId, apiBudget)
	}
	await saveStage(mapToApiStage(stage, projectId))
}

interface PaymentStageProps {
	contract: model.Contract,
	stage: model.PaymentStage,
	setContract: (contract: model.Contract) => void,
	setStage: (stage: model.PaymentStage) => void,
}

export default function PaymentStage(props: PaymentStageProps) {
	function setClientPayment2(clientPayment2: number | null) {
		props.setContract({
			form: {
				...props.contract.form!,
				clientPayment2,
			},
		})
		// Update hasChangesInModel flag
		props.setStage(props.stage)
	}

	function setClientPayment2Date(clientPayment2Date: Dayjs) {
		props.setContract({
			form: {
				...props.contract.form!,
				clientPayment2Date,
			},
		})
		props.setStage({
			...props.stage,
			completedOn: clientPayment2Date,
		})
	}

	return (
		<>
			{props.contract.form
				? (
					<Form layout="vertical" style={{marginTop: '20px'}}>
						<Form.Item label="Оплата">
							<Input.Group compact>
								<InputNumber
									value={props.contract.form.clientPayment2}
									onChange={setClientPayment2}
									addonAfter="₽"
								/>
								<DatePicker
									value={props.contract.form.clientPayment2Date}
									onChange={value => setClientPayment2Date(value!)}
									getPopupContainer={getPopupContainer}
									allowClear={false}
									format="DD.MM.YYYY"
								/>
							</Input.Group>
						</Form.Item>
					</Form>
				)
				: <Typography style={{margin: '20px'}}>Добавьте договор</Typography>
			}
		</>
	)
}
