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
import {DatePicker, Select} from 'antd'
import {Dayjs} from 'dayjs'
import React from 'react'
import {CostType} from '../../../../../api/costTypes/useCostTypes'
import {
	formStyle,
	getPopupContainer,
	toViewModelNumber,
	toViewNumber,
	toViewStatus,
} from './common'
import * as model from './model'
import styles from './styles.module.css'

interface CostPaymentsTableProps {
	costPayments: model.CostPayment[]
	setCostPayments: (costPayments: model.CostPayment[]) => void
	costs: CostType[]
}

interface CostSelectProps {
	error?: boolean
	costId?: number
	setCostId: (costId: number) => void
	costs: CostType[]
}

interface CostPaymentProps {
	payment: model.CostPayment
	setPayment: (payment: model.CostPayment) => void
	removePayment: () => void
	costs: CostType[]
}

function CostSelect(props: CostSelectProps) {
	const toViewCostType = (value: CostType) => ({
		label: value.name,
		value: value.id,
	})

	return (
		<Select
			value={props.costId}
			onChange={props.setCostId}
			className={styles.form_control}
			getPopupContainer={getPopupContainer}
			options={props.costs.map(toViewCostType)}
			optionFilterProp="label"
			showSearch
			status={toViewStatus(props.error)}
		/>
	)
}

function CostPayment(props: CostPaymentProps) {
	function setCostId(costId: number) {
		props.setPayment({
			...props.payment,
			costId,
		})
	}

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

export default function CostPaymentsTable(props: CostPaymentsTableProps) {
	interface NewPaymentState {
		needsValidation: boolean,
		paymentId: number,
		costId?: number,
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

	function setNewPaymentDate(paymentDate: Dayjs | null) {
		setNewPayment({
			...newPayment,
			paymentDate,
		})
	}

	function addPayment() {
		if (newPayment.costId === undefined || newPayment.amount === undefined || newPayment.paymentDate === null) {
			setNewPaymentNeedsValidation()
			return
		}
		props.setCostPayments([
			{
				paymentId: newPayment.paymentId,
				costId: newPayment.costId,
				amount: newPayment.amount,
				paymentDate: newPayment.paymentDate,
			},
			...props.costPayments,
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
						<TableCell>Тип издержки</TableCell>
						<TableCell>Сумма</TableCell>
						<TableCell>Дата платежа</TableCell>
						<TableCell/>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<CostSelect
								error={newPayment.needsValidation && newPayment.costId === undefined}
								costId={newPayment.costId}
								setCostId={setNewPaymentCostId}
								costs={props.costs}
							/>
						</TableCell>
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
					{props.costPayments.map(payment => (
						<CostPayment
							key={payment.paymentId}
							payment={payment}
							setPayment={setPayment}
							removePayment={() => removePayment(payment.paymentId)}
							costs={props.costs}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
