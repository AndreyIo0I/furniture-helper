import {DeleteOutlined} from '@ant-design/icons'
import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import {Button, Input} from 'antd'
import React, {useRef, useState} from 'react'
import {KeyedMutator} from 'swr'
import createCostType from '../../../../api/costTypes/createCostType'
import deleteCostType from '../../../../api/costTypes/deleteCostType'
import editCostType from '../../../../api/costTypes/editCostType'
import useCostTypes, {CostType} from '../../../../api/costTypes/useCostTypes'
import {User, UserRole} from '../../../../api/users/createUser'
import useCurrentUser from '../../../../api/users/useCurrentUser'
import MainLayout from '../../../components/MainLayout'
import {saveChangesWithMsg} from '../../../saveChangesWithMsg'
import {blurActiveElement} from '../../costs'

type CostInputProps = {
	row: CostType
	currentUser: User
	mutate: KeyedMutator<CostType[]>
}

function CostInput({
	row,
	currentUser,
	mutate,
}: CostInputProps) {
	const isEnterPressed = useRef(false)
	const [value, setValue] = useState(row.name)

	const isEditable = [UserRole.Admin, UserRole.Owner].includes(currentUser.role)

	const onEdit = () =>
		isEditable && saveChangesWithMsg(async () => {
			blurActiveElement()
			await editCostType({
				id: row.id,
				name: value,
			})
			await mutate()
		})

	const onDelete = () =>
		isEditable && saveChangesWithMsg(async () => {
			await deleteCostType(row.id)
			await mutate()
		}, 'Упс, этот тип уже используется')

	return (
		<TableRow
			key={row.id}
			sx={{'&:last-child td, &:last-child th': {border: 0}}}
		>
			<TableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<Input
					value={value}
					onChange={e => setValue(e.target.value)}
					disabled={!isEditable}
					onPressEnter={() => {
						isEnterPressed.current = true
						onEdit()
					}}
					onBlur={() => {
						if (!isEnterPressed.current) {
							setValue(row.name)
							isEnterPressed.current = false
						}
					}}
				/>
				<Button
					shape="circle"
					icon={<DeleteOutlined/>}
					type="link"
					onClick={onDelete}
					disabled={!isEditable}
				/>
			</TableCell>
		</TableRow>
	)
}

interface ContentProps {
	rows: CostType[]
	mutate: KeyedMutator<CostType[]>
}

function Content({
	rows,
	mutate,
}: ContentProps) {
	const {data: currentUser} = useCurrentUser()

	if (!currentUser) {
		return null
	}

	return (
		<>
			{rows.map(row => (
				<CostInput key={row.id} row={row} currentUser={currentUser} mutate={mutate}/>
			))}
		</>
	)
}

export default function CostTypesPage() {
	const [newValue, setNewValue] = useState('')

	const {data: rows, mutate} = useCostTypes()

	const onAdd = () =>
		saveChangesWithMsg(async () => {
			await createCostType({
				name: newValue,
			})
			await mutate()
			setNewValue('')
		})

	return (
		<MainLayout>
			<Container maxWidth="lg">
				<TableContainer component={Paper} sx={{maxWidth: '400px', margin: '24px 0'}}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<Typography>Типы издержек</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<TextField
										placeholder="Добавить..."
										value={newValue}
										variant="standard"
										onChange={e => setNewValue(e.target.value)}
										onKeyDown={event => {
											if (event.key === 'Enter') {
												onAdd()
											}
										}}
										fullWidth={true}
										autoComplete="off"
									/>
								</TableCell>
							</TableRow>
							{rows ? <Content rows={rows} mutate={mutate}/> : null}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</MainLayout>
	)
}
