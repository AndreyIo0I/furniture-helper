import React, {ChangeEvent, useState} from 'react'
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
import MainNav from '../../components/MainNav'
import {DatePicker} from '@mui/x-date-pickers'
import dayjs, {Dayjs} from 'dayjs'
import {styled} from '@mui/material/styles'

interface RowProps {
	cost: string;
	date: Dayjs;
	onCostChange: (newValue: string) => void;
	onDateChange: (newValue: Dayjs) => void;
	onRemove: () => void;
}

const DatePickerContainer = styled('div')(() => ({
	flex: '160px 0 0',
}))

function Row({
	cost,
	date,
	onCostChange,
	onDateChange,
	onRemove,
}: RowProps) {

	return (
		<TableRow
			sx={{'&:last-child td, &:last-child th': {border: 0}}}
		>
			<TableCell
				sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px'}}>
				<TextField
					variant="standard"
					defaultValue={cost}
					fullWidth={true}
					onChange={e => onCostChange(e.target.value)}
					onBlur={() => {
						/* send changes */
					}}
				/>
				<DatePickerContainer>
					<DatePicker
						value={date}
						onChange={newValue => {
							if (newValue) {
								onDateChange(newValue)
							}
						}}
						renderInput={params => <TextField {...params} />}
					/>
				</DatePickerContainer>
				<IconButton
					onClick={() => onRemove()}
					size="small"
				>
					<DeleteIcon fontSize="small"/>
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

const mockRows = ['гвозди', 'шурупы', 'доски', 'печенки']

export default function CostsPage() {
	const [newValue, setNewValue] = useState('')
	const [rows, setRows] = useState(() => mockRows)

	const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setNewValue(event.target.value)
	}

	const add = () => {
		setRows([newValue, ...rows])
		setNewValue('')
	}

	const onRemove = (index: number) => {
		setRows([...rows.slice(0, index), ...rows.slice(index + 1)])
	}

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				<TableContainer component={Paper} sx={{maxWidth: '600px', margin: '24px 0'}}>
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
								<Row
									key={row + index}
									cost={row}
									date={dayjs()}
									onCostChange={newCostName => {
										rows[index] = newCostName
									}}
									onDateChange={() => {
									}}
									onRemove={() => onRemove(index)}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}