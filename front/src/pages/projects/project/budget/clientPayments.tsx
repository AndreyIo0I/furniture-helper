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
import {DatePicker} from 'antd'
import {Dayjs} from 'dayjs'
import React from 'react'
import {
	formStyle,
	getPopupContainer,
	toViewModelNumber,
	toViewNumber,
	toViewStatus,
} from './common'
import * as model from './model'
import styles from './styles.module.css'

interface ClientPaymentsTableProps {
	clientPayments: model.ClientPayment[]
	setClientPayments: (clientPayments: model.ClientPayment[]) => void
}

interface ClientPaymentProps {
	payment: model.ClientPayment
	setPayment: (payment: model.ClientPayment) => void
	removePayment: () => void
}

function ClientPayment(props: ClientPaymentProps) {
	function setAmount(amount?: number) {
		props.setPayment({
			...props.payment,
			amount,
		})
	}

	function setPaymentDate(paymentDate: Dayjs | null) {
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
					value={props.payment.paymentDate}
					onChange={setPaymentDate}
					className={styles.form_control}
					getPopupContainer={getPopupContainer}
					status={toViewStatus(props.payment.paymentDate === null)}
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
		paymentDate: Dayjs | null,
	}

	function makeNewPayment(paymentId: number): NewPaymentState {
		return {
			needsValidation: false,
			paymentId,
			paymentDate: null,
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

	function setNewPaymentDate(paymentDate: Dayjs | null) {
		setNewPayment({
			...newPayment,
			paymentDate,
		})
	}

	function addPayment() {
		if (newPayment.amount === undefined || newPayment.paymentDate === null) {
			setNewPaymentNeedsValidation()
			return
		}
		props.setClientPayments([
			{
				paymentId: newPayment.paymentId,
				amount: newPayment.amount,
				paymentDate: newPayment.paymentDate,
			},
			...props.clientPayments,
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
								value={newPayment.paymentDate}
								onChange={setNewPaymentDate}
								className={styles.form_control}
								getPopupContainer={getPopupContainer}
								status={toViewStatus(newPayment.needsValidation && newPayment.paymentDate === null)}
							/>
						</TableCell>
						<TableCell>
							<IconButton onClick={addPayment}>
								<AddCircleOutline/>
							</IconButton>
						</TableCell>
					</TableRow>
					{props.clientPayments.map(payment => (
						<ClientPayment
							key={payment.paymentId}
							payment={payment}
							setPayment={setPayment}
							removePayment={() => removePayment(payment.paymentId)}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
