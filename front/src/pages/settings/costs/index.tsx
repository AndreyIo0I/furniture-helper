import DeleteIcon from '@mui/icons-material/Delete'
import {
	Container,
	IconButton,
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
import {Input, InputRef} from 'antd'
import React, {useRef, useState} from 'react'
import {KeyedMutator} from 'swr'
import createCostType from '../../../../api/costTypes/createCostType'
import deleteCostType from '../../../../api/costTypes/deleteCostType'
import editCostType from '../../../../api/costTypes/editCostType'
import useCostTypes, {CostType} from '../../../../api/costTypes/useCostTypes'
import MainLayout from '../../../components/MainLayout'
import useCurrentUser from '../../../../api/users/useCurrentUser'
import {User, UserRole} from '../../../../api/users/createUser'
import {saveChangesWithMsg} from '../../../saveChangesWithMsg'

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
	const ref = useRef<InputRef>(null)
	const isEnterPressed = useRef(false)
	const [value, setValue] = useState(row.name)

	const isEditable = currentUser.role === UserRole.Owner

	const onEdit = () =>
		isEditable && saveChangesWithMsg(async () => {
			ref.current?.blur()
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
		})

	return (
		<TableRow
			key={row.id}
			sx={{'&:last-child td, &:last-child th': {border: 0}}}
		>
			<TableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<Input
					ref={ref}
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
				<IconButton
					size="small"
					disabled={!isEditable}
					onClick={onDelete}
				>
					<DeleteIcon fontSize="small"/>
				</IconButton>
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
