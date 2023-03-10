import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons'
import {TextField} from '@mui/material'
import {Button, DatePicker, Input, InputNumber, InputRef, List} from 'antd'
import dayjs from 'dayjs'
import React, {useRef, useState} from 'react'
import {
	BusinessCostEntity,
	createBusinessCost,
	deleteBusinessCost,
	editBusinessCost,
	useBusinessCosts,
} from '../../../api/businessCosts/businessCosts'
import {User, UserRole} from '../../../api/users/createUser'
import useCurrentUser from '../../../api/users/useCurrentUser'
import MainLayout from '../../components/MainLayout'
import {saveChangesWithMsg} from '../../saveChangesWithMsg'

interface RowProps {
	cost: BusinessCostEntity
	onRemove: () => void
	isEditable: boolean
}

export function blurActiveElement() {
	const activeElement = document.activeElement
	if (activeElement && 'blur' in activeElement) {
		// @ts-ignore
		activeElement.blur()
	}
}

function Row({
	cost,
	onRemove,
	isEditable,
}: RowProps) {
	const [name, setName] = useState(cost.name!)
	const [amount, setAmount] = useState(cost.amount!)
	const [date, setDate] = useState(cost.date)

	const isEnterPressed = useRef(false)
	const onEdit = () => {
		isEditable && saveChangesWithMsg(async () => {
			blurActiveElement()
			await editBusinessCost({
				id: cost.id!,
				name,
				amount,
				date,
			})
		})
	}

	return (
		<List.Item
			style={{gap: '16px'}}
		>
			<Input
				disabled={!isEditable}
				value={name}
				onChange={e => setName(e.target.value)}
				onPressEnter={() => {
					isEnterPressed.current = true
					onEdit()
				}}
				onBlur={() => {
					if (!isEnterPressed.current) {
						setName(cost.name!)
						isEnterPressed.current = false
					}
				}}
			/>
			<DatePicker
				value={date}
				onChange={newDate => setDate(newDate!)}
				allowClear={false}
				disabled={!isEditable}
				onOpenChange={open => {
					if (!open && date !== cost.date) {
						onEdit()
					}
				}}
				format="DD.MM.YYYY"
				style={{flexShrink: 0}}
			/>
			<InputNumber
				disabled={!isEditable}
				value={amount}
				onChange={newAmount => newAmount && setAmount(newAmount)}
				onStep={newAmount => setAmount(newAmount)}
				onPressEnter={() => {
					isEnterPressed.current = true
					onEdit()
				}}
				onBlur={() => {
					if (!isEnterPressed.current) {
						setAmount(cost.amount!)
						isEnterPressed.current = false
					}
				}}
				min={1}
				style={{flexShrink: 0}}
			/>
			<Button
				shape="circle"
				icon={<DeleteOutlined/>}
				type="link"
				onClick={onRemove}
				disabled={!isEditable}
			/>
		</List.Item>
	)
}

interface ContentProps {
	businessCosts: BusinessCostEntity[]
	currentUser: User
}

function Content({
	businessCosts,
	currentUser,
}: ContentProps) {
	const isEditable = [UserRole.Admin, UserRole.Owner].includes(currentUser.role)
	const nameRef = useRef<InputRef>(null)
	const amountRef = useRef<HTMLInputElement>(null)

	const [date, setDate] = useState(dayjs())

	const [rows, setRows] = useState<BusinessCostEntity[]>(businessCosts)

	const onSaveBusinessCost = () => {
		saveChangesWithMsg(async () => {
			const amount: number = amountRef.current?.value ? parseInt(amountRef.current?.value) : 0
			const name: string = nameRef.current?.input?.value!
			const newBusinessCostId: number = await createBusinessCost({
				amount: amount,
				date: date.toISOString(),
				name: name,
			})

			const newBusinessCost: BusinessCostEntity = {
				id: newBusinessCostId,
				name: name,
				amount: amount,
				date: date,
			}

			setRows([newBusinessCost, ...rows])
		})
	}

	const onRemove = async (index: number, id: number) => {
		setRows([...rows.slice(0, index), ...rows.slice(index + 1)])
		await deleteBusinessCost(id)
	}

	return (
		<MainLayout>
			<List
				size="large"
				header={(
					<List.Item
						style={{gap: '16px'}}
					>
						<Input
							placeholder="Название издержки"
							ref={nameRef}
							autoComplete="off"
						/>
						<DatePicker
							value={date}
							onChange={newDate => setDate(newDate!)}
							allowClear={false}
							format="DD.MM.YYYY"
							style={{flexShrink: 0}}
						/>
						<InputNumber
							ref={amountRef}
							required
							type="number"
							placeholder="Сумма"
							style={{flexShrink: 0}}
						/>
						<Button
							type="link"
							icon={<PlusCircleOutlined/>}
							onClick={onSaveBusinessCost}
						/>
					</List.Item>
				)}
				bordered
				dataSource={rows}
				renderItem={(row, index) => (
					<Row
						key={row.id}
						cost={row}
						onRemove={() => onRemove(index, row.id!)}
						isEditable={isEditable}
					/>
				)}
			/>
		</MainLayout>
	)
}

export default function CostsPage() {
	const {data: currentUser} = useCurrentUser()
	const {data: businessCosts} = useBusinessCosts()

	if (!businessCosts || !currentUser)
		return null

	return <Content businessCosts={businessCosts} currentUser={currentUser}/>
}