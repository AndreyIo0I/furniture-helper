import React, { ChangeEvent, useState } from 'react'
import {
	Container,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MainNav from '../MainNav'
import dayjs, { Dayjs } from 'dayjs'

const mockRows = ['гвозди', 'шурупы', 'доски', 'печенки']

export default function TypeTotalCostsPage() {
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
			<MainNav />
			<Container maxWidth="lg">
				<TableContainer component={Paper} sx={{ maxWidth: '500px', marginTop: '24px', marginBottom: '24px',  marginLeft: '24px' }}>
					<Table>
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
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
										<TextField
											id="date"
											type="date"
											defaultValue={dayjs().format('YYYY-MM-DD')}
											InputLabelProps={{
												shrink: true,
											}}	
											size="small"	
											variant="standard"
											style={ {width : '240px', padding: '20px'} }
										/>
										<IconButton
											onClick={() => remove(index)}
											size="small"
										>
											<DeleteIcon fontSize="small" />
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