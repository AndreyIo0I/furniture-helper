import React from 'react'
import {
	Button,
	Container,
	Paper,
	SxProps,
	TextField,
} from '@mui/material'
import MainNav from '../MainNav'
import ProjectSecondaryNav from '../ProjectSecondaryNav'
import ClientPaymentsTable from './clientPayments'
import CostPaymentsTable from './costPayments'
import {formStyle} from './common'
import * as model from './model'
import styles from './styles.module.css'

interface ProjectBudgetPageProps {
	projectId: string,
}

const testBudget: model.ProjectBudget = {
	projectCost: 4919,
	clientPayments: [{
		paymentId: 0,
		amount: 0.2,
		paymentDate: new Date('2022-09-01'),
	}, {
		paymentId: 1,
		amount: 20,
		paymentDate: new Date('2022-09-15'),
	}, {
		paymentId: 2,
		amount: -20.2,
		paymentDate: new Date('2022-10-01'),
	}],
	costPayments: [{
		paymentId: 0,
		costId: 0,
		amount: 9999.99,
	}, {
		paymentId: 1,
		costId: 1,
		amount: 999.90,
	}, {
		paymentId: 2,
		costId: 2,
		amount: 99,
	}, {
		paymentId: 3,
		costId: 3,
		amount: 9.99,
	}],
	costs: [{
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
	}],
}

const projectCostStyle: SxProps = {
	m: 2,
}
const saveButtonStyle: SxProps = {
	my: 2,
}

export default function ProjectBudgetPage(props: ProjectBudgetPageProps) {
	const [budget, setBudget] = React.useState(() => testBudget)

	function setClientPayments(clientPayments: model.ClientPayment[]) {
		setBudget({
			...budget,
			clientPayments,
		})
	}
	function setCostPayments(costPayments: model.CostPayment[]) {
		setBudget({
			...budget,
			costPayments,
		})
	}

	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<Container maxWidth="lg">
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
					costs={budget.costs}
				/>
				<Button
					variant="contained"
					sx={saveButtonStyle}
				>
					Сохранить
				</Button>
			</Container>
		</>
	)
}
