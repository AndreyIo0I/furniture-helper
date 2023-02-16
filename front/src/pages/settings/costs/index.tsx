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
import React, {useState} from 'react'
import createCostType from '../../../../api/costTypes/createCostType'
import useCostTypes, {CostType} from '../../../../api/costTypes/useCostTypes'
import MainLayout from '../../../components/MainLayout'
import useCurrentUser from '../../../../api/users/useCurrentUser'
import {UserRole} from '../../../../api/users/createUser'

interface ContentProps {
	rows: CostType[]
}

function Content({rows}: ContentProps) {
	const {data: currentUser} = useCurrentUser()

	return (
		<>
			{rows.map(row => (
				<TableRow
					key={row.id}
					sx={{'&:last-child td, &:last-child th': {border: 0}}}
				>
					<TableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
						<TextField
							variant="standard"
							defaultValue={row.name}
							fullWidth={true}
							disabled={currentUser?.role !== UserRole.Owner}
						/>
						<IconButton
							size="small"
							disabled
						>
							<DeleteIcon fontSize="small"/>
						</IconButton>
					</TableCell>
				</TableRow>
			))}
		</>
	)
}

export default function CostTypesPage() {
	const [newValue, setNewValue] = useState('')

	const {data: rows, mutate} = useCostTypes()

	const onAdd = async () => {
		await createCostType({
			name: newValue,
		})
		await mutate()
		setNewValue('')
	}

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
							{rows ? <Content rows={rows}/> : null}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</MainLayout>
	)
}
