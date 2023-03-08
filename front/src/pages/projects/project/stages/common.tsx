import {TextField} from '@mui/material'
import {DatePicker, Form} from 'antd'
import {Dayjs} from 'dayjs'
import * as model from './model'

export const pageContainerId = 'projectStagesPageContainer'

export function getPopupContainer() {
	return document.getElementById(pageContainerId)!
}

export const mapToApiStage = (
	stage: model.GenericStage | model.ContractStage | model.PaymentStage,
	projectId: number,
) => ({
	id: stage.id,
	projectId,
	name: stage.name,
	description: stage.description,
	completedOn: stage.isCompleted ? stage.completedOn.toDate() : null,
	isCompleted: stage.isCompleted,
})

interface CommonStage {
	isCompleted: boolean,
	completedOn: Dayjs,
	description: string,
}

interface CommonStageFieldsProps<S extends CommonStage> {
	stage: S,
	setStage: (stage: S) => void,
}

export function CommonStageFields<S extends CommonStage>(props: CommonStageFieldsProps<S>) {
	function setCompletedOn(completedOn: Dayjs) {
		props.setStage({
			...props.stage,
			completedOn,
		})
	}

	function setDescription(description: string) {
		props.setStage({
			...props.stage,
			description,
		})
	}

	return (
		<>
			<Form.Item
				label="Дата завершения"
				style={{
					margin: '16px 0 0',
				}}
			>
				<DatePicker
					value={props.stage.completedOn}
					onChange={value => setCompletedOn(value!)}
					getPopupContainer={getPopupContainer}
					allowClear={false}
					format="DD.MM.YYYY"
				/>
			</Form.Item>
			<TextField
				value={props.stage.description}
				onChange={event => setDescription(event.target.value)}
				label="Описание"
				margin="normal"
				style={{
					marginBottom: '16px',
				}}
				minRows={4}
				maxRows={16}
				fullWidth
				multiline
			/>
		</>
	)
}
