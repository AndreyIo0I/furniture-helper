import {DeleteFilled, PlusCircleOutlined} from '@ant-design/icons'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {Button, DatePicker, InputNumber} from 'antd'
import {Dayjs} from 'dayjs'
import React from 'react'
import {addRowStyle, formStyle, getPopupContainer, toViewStatus} from './common'
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
	function setAmount(amount: number | null) {
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
				<InputNumber
					value={props.payment.amount}
					onChange={setAmount}
					className={styles.form_control}
					status={toViewStatus(props.payment.amount === null)}
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
				<Button
					type="link"
					icon={<DeleteFilled/>}
					onClick={props.removePayment}
				/>
			</TableCell>
		</TableRow>
	)
}

export default function ClientPaymentsTable(props: ClientPaymentsTableProps) {
	interface NewPaymentState {
		needsValidation: boolean,
		paymentId: number,
		amount: number | null,
		paymentDate: Dayjs | null,
	}

	function makeNewPayment(paymentId: number): NewPaymentState {
		return {
			needsValidation: false,
			paymentId,
			amount: null,
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

	function setNewPaymentAmount(amount: number | null) {
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
		if (newPayment.amount === null || newPayment.paymentDate === null) {
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
					<TableRow style={addRowStyle}>
						<TableCell>
							<InputNumber
								value={newPayment.amount}
								onChange={setNewPaymentAmount}
								className={styles.form_control}
								status={toViewStatus(newPayment.needsValidation && newPayment.amount === null)}
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
							<Button
								type="link"
								icon={<PlusCircleOutlined/>}
								onClick={addPayment}
							/>
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
