import {Button, Container, Paper, SxProps, TextField} from '@mui/material'
import React from 'react'
import saveProjectBudget from '../../../../../api/saveProjectBudget'
import useProjectBudget, {ProjectBudget} from '../../../../../api/useProjectBudget'
import MainNav from '../../../../components/MainNav'
import ProjectSecondaryNav from '../../../../components/ProjectSecondaryNav'
import ClientPaymentsTable from './clientPayments'
import {formStyle} from './common'
import CostPaymentsTable from './costPayments'
import * as model from './model'
import styles from './styles.module.css'

interface ProjectBudgetPageProps {
	projectId: number,
}

const testCosts: model.Cost[] = [{
	costId: 0,
	name: 'гвозди',
}, {
	costId: 1,
	name: 'шурупы',
}, {
	costId: 2,
	name: 'доски',
}, {
	costId: 3,
	name: 'печенки',
}]

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
	projectCost: projectBudget.projectCost,
	clientPayments: projectBudget.clientPayments.map(payment => ({
		paymentDate: payment.paymentDate,
		amount: payment.amount,
	})),
	costPayments: projectBudget.costPayments.map(payment => ({
		costId: payment.costId,
		amount: payment.amount,
	})),
})

export default function ProjectBudgetPage(props: ProjectBudgetPageProps) {
	const [budget, setBudget] = React.useState<model.ProjectBudget>()
	const {data: apiProjectBudget, mutate} = useProjectBudget(props.projectId)

	if (!budget && apiProjectBudget) {
		setBudget(mapToProjectBudgetViewModel(apiProjectBudget))
	}

	async function updateProjectBudget() {
		const apiProjectBudget = mapToApiProjectBudget(budget!, props.projectId)
		await saveProjectBudget(apiProjectBudget)
		mutate(apiProjectBudget)
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
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			{budget && <Container maxWidth="lg">
				<Paper sx={formStyle}>
					<TextField
						type="number"
						variant="standard"
						label="Цена для клиента"
						defaultValue={budget.projectCost}
						sx={projectCostStyle}
						className={styles.form_control}
					/>
				</Paper>
				<ClientPaymentsTable
					clientPayments={budget.clientPayments}
					setClientPayments={setClientPayments}
				/>
				<CostPaymentsTable
					costPayments={budget.costPayments}
					setCostPayments={setCostPayments}
					costs={testCosts}
				/>
				<Button
					variant="contained"
					sx={saveButtonStyle}
					onClick={updateProjectBudget}
				>
					Сохранить
				</Button>
			</Container>}
		</>
	)
}
