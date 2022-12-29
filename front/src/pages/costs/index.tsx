import React, {ChangeEvent, useRef, useState} from 'react'
import {
	Box,
	Button,
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
import useBusinessCosts, { BuisnessCostEntity } from '../../../api/useBusinessCosts'
import createBusinessCost from '../../../api/createBusinessCost'
import project from '../projects/project'

interface RowProps {
	cost: BuisnessCostEntity;
	onRemove: () => void;
}

const DatePickerContainer = styled('div')(() => ({
	flex: '160px 0 0',
}))

function Row({
	cost,
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
					disabled
					defaultValue={cost.name}
					fullWidth={true}
				/>
				<DatePickerContainer>
					<DatePicker
						value={cost.date}
						disabled
						onChange={() => {}}
						renderInput={params => <TextField {...params} />}
					/>
				</DatePickerContainer>
				<TextField
					variant="standard"
					disabled
					defaultValue={cost.amount}
					fullWidth={true}
				/>
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

export default function CostsPage() {
	const {data: buisnessCosts} = useBusinessCosts()

	const nameRef = useRef<HTMLInputElement>(null)
	const amountRef = useRef<HTMLInputElement>(null)

	const [date, setDate] = useState(dayjs())

	const [rows, setRows] = useState<BuisnessCostEntity[]>( buisnessCosts || [] )

	const onSaveBuisnessCost = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		const amount: number = amountRef.current?.value ? parseInt(amountRef.current?.value) : 0
		const name: string = nameRef.current?.value!
		const newBuisenessCostId: number = await createBusinessCost({
			amount: amount,
			date: date.toISOString(),
			name: name
		})

		const newBuisenessCost: BuisnessCostEntity = {
			id: newBuisenessCostId,
			name: name,
			amount: amount,
			date: date

		}
		
		setRows([newBuisenessCost, ...rows])
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
									<Box
										sx={{
											display: 'grid',
											gridTemplate: 'auto / 1fr',
											maxWidth: '600px',
											gap: '16px',
											padding: '20px 0',
										}}
										component="form"
										onSubmit={onSaveBuisnessCost}
									>
										<TextField
											placeholder="Название издержки"
											inputRef={nameRef}
											variant="standard"
											fullWidth={true}
											autoComplete="off"
										/>
										<DatePicker
											label="Дата"
											value={date}
											onChange={newValue => {
												if (newValue) {
													setDate(newValue)
												}
											}}
											renderInput={params => <TextField {...params} />}
										/>
										<TextField
											inputRef={amountRef}
											margin="none"
											required
											type="number"
											defaultValue={0}
											label="Сумма"
										/>
										<div>
											<Button
												type="submit"
												variant="contained"
											>
												Сохранить
											</Button>
										</div>
									</Box>
								</TableCell>
							</TableRow>
							{buisnessCosts && buisnessCosts.map((row, index) => (
								<Row
									key={row.id}
									cost={row}
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