import {Container, Paper, SxProps} from '@mui/material'
import {Button, Form, InputNumber} from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import useCostTypes, {CostType} from '../../../../../api/costTypes/useCostTypes'
import saveProjectBudget from '../../../../../api/projects/saveProjectBudget'
import useProject from '../../../../../api/projects/useProject'
import useProjectBudget, {ProjectBudget} from '../../../../../api/projects/useProjectBudget'
import MainLayout from '../../../../components/MainLayout'
import {saveChangesWithMsg} from '../../../../saveChangesWithMsg'
import ClientPaymentsTable from './clientPayments'
import {formStyle, pageContainerId, toApiModelDate, toApiModelNumber, toViewStatus} from './common'
import CostPaymentsTable from './costPayments'
import * as model from './model'
import styles from './styles.module.css'

const projectCostStyle: SxProps = {
	...formStyle,
	p: 2,
}

function isValidProjectBudget(projectBudget: model.ProjectBudget) {
	function isValidClientPayment(payment: model.ClientPayment) {
		return payment.amount !== null && payment.paymentDate !== null
	}

	function isValidCostPayment(payment: model.CostPayment) {
		return payment.amount !== null && payment.paymentDate !== null
	}

	return (
		projectBudget.projectCost !== null
		&& projectBudget.clientPayments.every(isValidClientPayment)
		&& projectBudget.costPayments.every(isValidCostPayment)
	)
}

const mapToProjectBudgetViewModel = (projectBudget: ProjectBudget): model.ProjectBudget => ({
	projectCost: projectBudget.projectCost,
	clientPayments: projectBudget.clientPayments.map((payment, index) => ({
		paymentId: index,
		amount: payment.amount,
		paymentDate: dayjs(payment.paymentDate),
	})),
	costPayments: projectBudget.costPayments.map((payment, index) => ({
		paymentId: index,
		costId: payment.costId,
		amount: payment.amount,
		paymentDate: dayjs(payment.paymentDate),
	})),
	hasChangesInModel: false,
})

const mapToApiProjectBudget = (projectBudget: model.ProjectBudget, projectId: number): ProjectBudget => ({
	projectId,
	projectCost: toApiModelNumber(projectBudget.projectCost),
	clientPayments: projectBudget.clientPayments.map(payment => ({
		paymentDate: toApiModelDate(payment.paymentDate),
		amount: toApiModelNumber(payment.amount),
	})),
	costPayments: projectBudget.costPayments.map(payment => ({
		costId: payment.costId,
		paymentDate: toApiModelDate(payment.paymentDate),
		amount: toApiModelNumber(payment.amount),
	})),
})

interface ContentProps {
	projectId: number
	costTypes: CostType[]
	disabled: boolean
}

function Content({
	projectId,
	costTypes,
	disabled,
}: ContentProps) {
	const [budget, setBudget] = React.useState<model.ProjectBudget>()
	const {data: apiProjectBudget, mutate} = useProjectBudget(projectId)

	if (!budget && apiProjectBudget) {
		setBudget(mapToProjectBudgetViewModel(apiProjectBudget))
	}

	function updateProjectBudget() {
		saveChangesWithMsg(async () => {
			let apiProjectBudget = mapToApiProjectBudget(budget!, projectId)
			await saveProjectBudget(apiProjectBudget)
			mutate(apiProjectBudget)
			setBudget({
				...budget!,
				hasChangesInModel: false,
			})
		})
	}

	function setProjectCost(projectCost: number | null) {
		setBudget({
			...budget!,
			projectCost,
			hasChangesInModel: true,
		})
	}

	function setClientPayments(clientPayments: model.ClientPayment[]) {
		setBudget({
			...budget!,
			clientPayments,
			hasChangesInModel: true,
		})
	}

	function setCostPayments(costPayments: model.CostPayment[]) {
		setBudget({
			...budget!,
			costPayments,
			hasChangesInModel: true,
		})
	}

	return (
		<MainLayout
			projectId={projectId}
		>
			{budget && <Container
				id={pageContainerId}
				style={{position: 'relative'}}
				maxWidth="lg"
			>
				<Paper sx={projectCostStyle}>
					<Form layout="vertical">
						<Form.Item
							label="Цена изделия"
							style={{margin: 0}}
						>
							<InputNumber
								value={budget.projectCost}
								onChange={setProjectCost}
								className={styles.form_control}
								status={toViewStatus(budget.projectCost === null)}
								disabled={disabled}
							/>
						</Form.Item>
					</Form>
				</Paper>
				<ClientPaymentsTable
					clientPayments={budget.clientPayments}
					setClientPayments={setClientPayments}
					disabled={disabled}
				/>
				<CostPaymentsTable
					costPayments={budget.costPayments}
					setCostPayments={setCostPayments}
					costs={costTypes}
					disabled={disabled}
				/>
				<Button
					type="primary"
					onClick={updateProjectBudget}
					style={{margin: '16px 0'}}
					disabled={!budget.hasChangesInModel || !isValidProjectBudget(budget) || disabled}
				>
                    Сохранить
				</Button>
			</Container>}
		</MainLayout>
	)
}

interface ProjectBudgetPageProps {
	projectId: number
}

export default function ProjectBudgetPage(props: ProjectBudgetPageProps) {
	const {data: costTypes} = useCostTypes()
	const {data: project} = useProject(props.projectId)

	if (!costTypes || !project)
		return null

	return <Content projectId={props.projectId} costTypes={costTypes} disabled={!!project.isCompleted}/>
}
