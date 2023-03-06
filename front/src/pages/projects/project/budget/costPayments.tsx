import {DeleteFilled, PlusCircleOutlined} from '@ant-design/icons'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {Button, DatePicker, InputNumber, Select} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import React from 'react'
import {CostType} from '../../../../../api/costTypes/useCostTypes'
import {addRowStyle, formStyle, getPopupContainer, toViewStatus} from './common'
import * as model from './model'
import styles from './styles.module.css'

interface CostPaymentsTableProps {
	costPayments: model.CostPayment[]
	setCostPayments: (costPayments: model.CostPayment[]) => void
	costs: CostType[]
	disabled: boolean
}

interface CostSelectProps {
	error?: boolean
	costId?: number
	setCostId: (costId: number) => void
	costs: CostType[]
	disabled: boolean
}

interface CostPaymentProps {
	payment: model.CostPayment
	setPayment: (payment: model.CostPayment) => void
	removePayment: () => void
	costs: CostType[]
	disabled: boolean
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
			disabled={props.disabled}
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
				<CostSelect
					costId={props.payment.costId}
					setCostId={setCostId}
					costs={props.costs}
					disabled={props.disabled}
				/>
			</TableCell>
			<TableCell>
				<InputNumber
					value={props.payment.amount}
					onChange={setAmount}
					className={styles.form_control}
					status={toViewStatus(props.payment.amount === null)}
					disabled={props.disabled}
				/>
			</TableCell>
			<TableCell>
				<DatePicker
					value={props.payment.paymentDate}
					onChange={setPaymentDate}
					className={styles.form_control}
					getPopupContainer={getPopupContainer}
					status={toViewStatus(props.payment.paymentDate === null)}
					disabled={props.disabled}
					format="DD.MM.YYYY"
				/>
			</TableCell>
			<TableCell>
				<Button
					type="link"
					icon={<DeleteFilled/>}
					onClick={props.removePayment}
					disabled={props.disabled}
				/>
			</TableCell>
		</TableRow>
	)
}

export default function CostPaymentsTable(props: CostPaymentsTableProps) {
	interface NewPaymentState {
		needsValidation: boolean,
		paymentId: number,
		costId?: number,
		amount: number | null,
		paymentDate: Dayjs | null,
	}

	function makeNewPayment(paymentId: number): NewPaymentState {
		return {
			needsValidation: false,
			paymentId,
			amount: null,
			paymentDate: dayjs(),
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
		if (newPayment.costId === undefined || newPayment.amount === null || newPayment.paymentDate === null) {
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
					<TableRow style={addRowStyle}>
						<TableCell>
							<CostSelect
								error={newPayment.needsValidation && newPayment.costId === undefined}
								costId={newPayment.costId}
								setCostId={setNewPaymentCostId}
								costs={props.costs}
								disabled={props.disabled}
							/>
						</TableCell>
						<TableCell>
							<InputNumber
								value={newPayment.amount}
								onChange={setNewPaymentAmount}
								className={styles.form_control}
								status={toViewStatus(newPayment.needsValidation && newPayment.amount === null)}
								disabled={props.disabled}
							/>
						</TableCell>
						<TableCell>
							<DatePicker
								value={newPayment.paymentDate}
								onChange={setNewPaymentDate}
								className={styles.form_control}
								getPopupContainer={getPopupContainer}
								status={toViewStatus(newPayment.needsValidation && newPayment.paymentDate === null)}
								disabled={props.disabled}
								format="DD.MM.YYYY"
							/>
						</TableCell>
						<TableCell>
							<Button
								type="link"
								icon={<PlusCircleOutlined/>}
								onClick={addPayment}
								disabled={props.disabled}
							/>
						</TableCell>
					</TableRow>
					{props.costPayments.map(payment => (
						<CostPayment
							key={payment.paymentId}
							payment={payment}
							setPayment={setPayment}
							removePayment={() => removePayment(payment.paymentId)}
							costs={props.costs}
							disabled={props.disabled}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
