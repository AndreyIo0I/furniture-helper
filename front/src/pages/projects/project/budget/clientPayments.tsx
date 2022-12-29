import {AddCircleOutline, Delete} from '@mui/icons-material'
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import React from 'react'
import {formStyle, toViewModelNumber, toViewNumber} from './common'
import * as model from './model'
import styles from './styles.module.css'

interface ClientPaymentsTableProps {
	clientPayments: model.ClientPayment[],
	setClientPayments: (clientPayments: model.ClientPayment[]) => void,
}

interface ClientPaymentProps {
	payment: model.ClientPayment,
	setPayment: (payment: model.ClientPayment) => void,
	removePayment: () => void,
}

function ClientPayment(props: ClientPaymentProps) {
	function setAmount(amount?: number) {
		props.setPayment({
			...props.payment,
			amount,
		})
	}
	function setPaymentDate(paymentDate: Date) {
		props.setPayment({
			...props.payment,
			paymentDate,
		})
	}

	return (
		<TableRow>
			<TableCell>
				<TextField
					type="number"
					variant="standard"
					value={toViewNumber(props.payment.amount)}
					onChange={event =>
						setAmount(toViewModelNumber(event.target.value))
					}
					className={styles.form_control}
					error={props.payment.amount === undefined}
				/>
			</TableCell>
			<TableCell>
				<DatePicker
					renderInput={props => <TextField {...props}/>}
					value={props.payment.paymentDate}
					onChange={date => {
						if (date !== null) setPaymentDate(date)
					}}
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

export default function ClientPaymentsTable(props: ClientPaymentsTableProps) {
	interface NewPaymentState {
		needsValidation: boolean,
		paymentId: number,
		amount?: number,
		paymentDate: Date | null,
	}

	function makeNewPayment(paymentId: number): NewPaymentState {
		return {
			needsValidation: false,
			paymentId,
			paymentDate: new Date(),
		}
	}

	const [newPayment, setNewPayment] = React.useState(
		() => makeNewPayment(props.clientPayments.length),
	)

	function setNewPaymentNeedsValidation() {
		setNewPayment({
			...newPayment,
			needsValidation: true,
		})
	}

	function setNewPaymentAmount(amount?: number) {
		setNewPayment({
			...newPayment,
			amount,
		})
	}

	function setNewPaymentDate(paymentDate: Date | null) {
		setNewPayment({
			...newPayment,
			paymentDate,
		})
	}

	function addPayment() {
		if (newPayment.amount === undefined
			|| newPayment.paymentDate === null || isNaN(Number(newPayment.paymentDate))) {
			setNewPaymentNeedsValidation()
			return
		}
		props.setClientPayments([
			...props.clientPayments,
			{
				paymentId: newPayment.paymentId,
				amount: newPayment.amount,
				paymentDate: newPayment.paymentDate,
			},
		])
		setNewPayment(makeNewPayment(newPayment.paymentId + 1))
	}

	function setPayment(payment: model.ClientPayment) {
		props.setClientPayments(
			props.clientPayments.map(oldPayment =>
				oldPayment.paymentId === payment.paymentId ? payment : oldPayment,
			),
		)
	}

	function removePayment(paymentId: number) {
		props.setClientPayments(
			props.clientPayments.filter(payment => payment.paymentId !== paymentId),
		)
	}

	return (
		<TableContainer
			component={Paper}
			sx={formStyle}
		>
			<h3 className={styles.table_header}>Таблица платежей клиента</h3>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Сумма платежа</TableCell>
						<TableCell>Дата платежа</TableCell>
						<TableCell/>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.clientPayments.map(payment => (
						<ClientPayment
							key={payment.paymentId}
							payment={payment}
							setPayment={setPayment}
							removePayment={() => removePayment(payment.paymentId)}
						/>
					))}
					<TableRow>
						<TableCell>
							<TextField
								type="number"
								variant="standard"
								value={toViewNumber(newPayment.amount)}
								onChange={event =>
									setNewPaymentAmount(toViewModelNumber(event.target.value))
								}
								className={styles.form_control}
								error={
									newPayment.needsValidation
									&& newPayment.amount === undefined
								}
							/>
						</TableCell>
						<TableCell>
							<DatePicker
								renderInput={props => <TextField {...props}/>}
								value={newPayment.paymentDate}
								onChange={setNewPaymentDate}
								className={styles.form_control}
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
