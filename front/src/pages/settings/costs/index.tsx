import React, {ChangeEvent, useState} from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete'
import MainNav from '../../../components/MainNav'
import SettingsSecondaryNav from '../../../components/SettingsSecondaryNav'

const mockRows = ['гвозди', 'шурупы', 'доски', 'печенки']

export default function TypeCostsPage() {
	const [newValue, setNewValue] = useState('')
	const [rows, setRows] = useState(() => mockRows)

	const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setNewValue(event.target.value)
	}

	const add = () => {
		setRows([newValue, ...rows])
		setNewValue('')
	}

	const remove = (index: number) => {
		setRows([...rows.slice(0, index), ...rows.slice(index + 1)])
	}

	return (
		<>
			<MainNav/>
			<SettingsSecondaryNav/>
			<Container maxWidth="lg">
				<TableContainer component={Paper} sx={{maxWidth: '400px', margin: '24px 0'}}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<Typography>Виды издержек</Typography>
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
										onChange={onChange}
										onKeyDown={event => {
											if (event.key === 'Enter') {
												add()
											}
										}}
										fullWidth={true}
										autoComplete="off"
									/>
								</TableCell>
							</TableRow>
							{rows.map((row, index) => (
								<TableRow
									key={row + index}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
										<TextField
											variant="standard"
											defaultValue={row}
											fullWidth={true}
											onChange={e => {
												rows[index] = e.target.value
											}}
											onBlur={() => {
												/* send changes */
											}}
										/>
										<IconButton
											onClick={() => remove(index)}
											size="small"
										>
											<DeleteIcon fontSize="small"/>
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}
