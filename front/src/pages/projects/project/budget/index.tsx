import {Button, Container, Paper, SxProps, TextField} from '@mui/material'
import React from 'react'
import useCostTypes, {CostType} from '../../../../../api/costTypes/useCostTypes'
import saveProjectBudget from '../../../../../api/saveProjectBudget'
import useProjectBudget, {ProjectBudget} from '../../../../../api/useProjectBudget'
import MainLayout from '../../../../components/MainLayout'
import ClientPaymentsTable from './clientPayments'
import {formStyle, toApiModelDate, toApiModelNumber, toViewModelNumber, toViewNumber} from './common'
import CostPaymentsTable from './costPayments'
import * as model from './model'
import styles from './styles.module.css'

const projectCostStyle: SxProps = {
	m: 2,
}
const saveButtonStyle: SxProps = {
	my: 2,
}

const mapToProjectBudgetViewModel = (projectBudget: ProjectBudget): model.ProjectBudget => ({
	projectCost: projectBudget.projectCost,
	clientPayments: projectBudget.clientPayments.map((payment, index) => ({
		...payment,
		paymentId: index,
	})),
	costPayments: projectBudget.costPayments.map((payment, index) => ({
		...payment,
		paymentId: index,
	})),
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
}

function Content(props: ContentProps) {
	const [budget, setBudget] = React.useState<model.ProjectBudget>()
	const {data: apiProjectBudget, mutate} = useProjectBudget(props.projectId)

	if (!budget && apiProjectBudget) {
		setBudget(mapToProjectBudgetViewModel(apiProjectBudget))
	}

	async function updateProjectBudget() {
		let apiProjectBudget
		try {
			apiProjectBudget = mapToApiProjectBudget(budget!, props.projectId)
		} catch (err) {
			return
		}
		await saveProjectBudget(apiProjectBudget)
		await mutate(apiProjectBudget)
	}

	function setProjectCost(projectCost?: number) {
		setBudget({
			...budget!,
			projectCost,
		})
	}

	function setClientPayments(clientPayments: model.ClientPayment[]) {
		setBudget({
			...budget!,
			clientPayments,
		})
	}

	function setCostPayments(costPayments: model.CostPayment[]) {
		setBudget({
			...budget!,
			costPayments,
		})
	}

	return (
		<MainLayout
			projectId={props.projectId}
		>
			{budget && <Container maxWidth="lg">
				<Paper sx={formStyle}>
					<TextField
						type="number"
						variant="standard"
						label="Цена для клиента"
						value={toViewNumber(budget.projectCost)}
						onChange={event =>
							setProjectCost(toViewModelNumber(event.target.value))
						}
						sx={projectCostStyle}
						className={styles.form_control}
						error={budget.projectCost === undefined}
					/>
				</Paper>
				<ClientPaymentsTable
					clientPayments={budget.clientPayments}
					setClientPayments={setClientPayments}
				/>
				<CostPaymentsTable
					costPayments={budget.costPayments}
					setCostPayments={setCostPayments}
					costs={props.costTypes}
				/>
				<Button
					variant="contained"
					sx={saveButtonStyle}
					onClick={updateProjectBudget}
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

	if (!costTypes)
		return null

	return <Content projectId={props.projectId} costTypes={costTypes}/>
}
