import {AddCircleOutline, Delete} from '@mui/icons-material'
import {
	FormControl,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import React from 'react'
import {formStyle} from './common'
import * as model from './model'
import styles from './styles.module.css'

interface CostPaymentsTableProps {
	costPayments: model.CostPayment[],
	setCostPayments: (costPayments: model.CostPayment[]) => void,
	costs: model.Cost[],
}

interface CostSelectProps {
	costId?: number,
	setCostId: (costId: number) => void,
	costs: model.Cost[],
}

interface CostPaymentProps {
	payment: model.CostPayment,
	setPayment: (payment: model.CostPayment) => void,
	removePayment: () => void,
	costs: model.Cost[],
}

function CostSelect(props: CostSelectProps) {
	return (
		<Select
			value={props.costId !== undefined ? props.costId : ''}
			onChange={event =>
				props.setCostId(Number(event.target.value))
			}
			className={styles.form_control}
		>
			{props.costs.map(cost => (
				<MenuItem
					key={cost.costId}
					value={cost.costId}
				>
					{cost.name}
				</MenuItem>
			))}
		</Select>
	)
}

function CostPayment(props: CostPaymentProps) {
	function setCostId(costId: number) {
		props.setPayment({
			...props.payment,
			costId,
		})
	}

	return (
		<TableRow>
			<TableCell>
				<CostSelect
					costId={props.payment.costId}
					setCostId={setCostId}
					costs={props.costs}
				/>
			</TableCell>
			<TableCell>
				<TextField
					type="number"
					variant="standard"
					defaultValue={props.payment.amount}
					className={styles.form_control}
				/>
			</TableCell>
			<TableCell>
				<IconButton onClick={props.removePayment}>
					<Delete/>
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

export default function CostPaymentsTable(props: CostPaymentsTableProps) {
	interface NewPaymentState {
		needsValidation: boolean,
		paymentId: number,
		costId?: number,
		amount?: number,
	}

	function makeNewPayment(paymentId: number): NewPaymentState {
		return {
			needsValidation: false,
			paymentId,
		}
	}

	const [newPayment, setNewPayment] = React.useState(
		() => makeNewPayment(props.costPayments.length),
	)

	function setNewPaymentNeedsValidation() {
		setNewPayment({
			...newPayment,
			needsValidation: true,
		})
	}

	function setNewPaymentCostId(costId: number) {
		setNewPayment({
			...newPayment,
			costId,
		})
	}

	function setNewPaymentAmount(amount?: number) {
		setNewPayment({
			...newPayment,
			amount,
		})
	}

	function addPayment() {
		if (newPayment.costId === undefined || newPayment.amount === undefined) {
			setNewPaymentNeedsValidation()
			return
		}
		props.setCostPayments([
			...props.costPayments,
			{
				paymentId: newPayment.paymentId,
				costId: newPayment.costId,
				amount: newPayment.amount,
			},
		])
		setNewPayment(makeNewPayment(newPayment.paymentId + 1))
	}

	function setPayment(payment: model.CostPayment) {
		props.setCostPayments(
			props.costPayments.map(oldPayment =>
				oldPayment.paymentId === payment.paymentId ? payment : oldPayment,
			),
		)
	}

	function removePayment(paymentId: number) {
		props.setCostPayments(
			props.costPayments.filter(payment => payment.paymentId !== paymentId),
		)
	}

	return (
		<TableContainer
			component={Paper}
			sx={formStyle}
		>
			<h3 className={styles.table_header}>Таблица издержек</h3>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Название издержки</TableCell>
						<TableCell>Сумма</TableCell>
						<TableCell/>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.costPayments.map(payment => (
						<CostPayment
							key={payment.paymentId}
							payment={payment}
							setPayment={setPayment}
							removePayment={() => removePayment(payment.paymentId)}
							costs={props.costs}
						/>
					))}
					<TableRow>
						<TableCell>
							<FormControl
								error={
									newPayment.needsValidation
									&& newPayment.costId === undefined
								}
							>
								<CostSelect
									costId={newPayment.costId}
									setCostId={setNewPaymentCostId}
									costs={props.costs}
								/>
							</FormControl>
						</TableCell>
						<TableCell>
							<TextField
								type="number"
								variant="standard"
								value={newPayment.amount !== undefined ? newPayment.amount : ''}
								onChange={event => {
									const value = event.target.value
									setNewPaymentAmount(value !== '' ? Number(value) : undefined)
								}}
								className={styles.form_control}
								error={
									newPayment.needsValidation
									&& newPayment.amount === undefined
								}
							/>
						</TableCell>
						<TableCell>
							<IconButton onClick={addPayment}>
								<AddCircleOutline/>
							</IconButton>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}
