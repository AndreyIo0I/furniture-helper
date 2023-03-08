import {Button, Form} from 'antd'
import React, {useState} from 'react'
import {ProjectBudget} from '../../../../../api/projects/useProjectBudget'
import {Project} from '../../../../../api/projects/useProjects'
import saveStage from '../../../../../api/saveStage'
import {Contract, ContractForm, saveContract} from '../../../../components/Contract'
import {isDeepEqual} from '../../../../helpers'
import {CommonStageFields, getPopupContainer, mapToApiStage} from './common'
import * as model from './model'

export async function saveContractStage(
	stage: model.ContractStage,
	contract: model.Contract,
	projectId: number,
	apiBudget: ProjectBudget,
) {
	if (contract.form) {
		await saveContract(contract.form, projectId, apiBudget)
	}
	await saveStage(mapToApiStage(stage, projectId))
}

interface ContractStageProps {
	project: Project
	contract: model.Contract
	stage: model.ContractStage
	setContract: (contract: model.Contract) => void
	setStage: (stage: model.ContractStage) => void
	setOpen: (isOpen: boolean) => void
}

export default function ContractStage(props: ContractStageProps) {
	const [withContract, setWithContract] = useState(!!props.project.contractNumber)
	const [form] = Form.useForm()

	React.useEffect(() => {
		if (withContract && props.contract.form && !isDeepEqual(form.getFieldsValue(true), props.contract.form)) {
			form.setFieldsValue({...props.contract.form})
		}
	}, [props.contract.form]) // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		if (withContract) {
			if (props.stage.isCompleted) {
				form.validateFields().catch(err => {
					if (err.errorFields.length) {
						props.setOpen(true)
					}
				})
			} else {
				form.resetFields()
				form.setFieldsValue({...props.contract.form})
			}
		}
	}, [withContract, props.stage.isCompleted]) // eslint-disable-line react-hooks/exhaustive-deps

	function updateContract(form: ContractForm) {
		props.setContract({
			form: {
				...props.contract.form,
				...form,
			},
		})
		// Update hasChangesInModel flag
		props.setStage(props.stage)
	}

	return (
		<>
			<CommonStageFields
				stage={props.stage}
				setStage={props.setStage}
			/>
			{withContract
				? (
					<Form
						form={form}
						onValuesChange={updateContract}
						layout="vertical"
						style={{
							margin: '0 0 16px',
						}}
					>
						<Contract
							projectId={props.project.id}
							disabled={false}
							getPopupContainer={getPopupContainer}
							onLoaded={() => {
								!props.contract.form && props.setContract({
									form: form.getFieldsValue(true),
								})
							}}
						/>
					</Form>
				)
				: (
					<Button
						onClick={() => setWithContract(true)}
						style={{
							marginBottom: '16px',
						}}
					>
						Добавить договор
					</Button>
				)}
		</>
	)
}
