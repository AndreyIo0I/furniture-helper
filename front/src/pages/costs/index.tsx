import {AddCircleOutline} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import {
	Box,
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
import {styled} from '@mui/material/styles'
import {DatePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, {useRef, useState} from 'react'
import createBusinessCost from '../../../api/createBusinessCost'
import deleteBusinessCost from '../../../api/deleteBusinessCost'
import useBusinessCosts, {BusinessCostEntity} from '../../../api/useBusinessCosts'
import MainNav from '../../components/MainNav'

interface RowProps {
	cost: BusinessCostEntity;
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
						onChange={() => {
						}}
						renderInput={params => <TextField {...params} />}
					/>
				</DatePickerContainer>
				<TextField
					sx={{
						flex: '160px 0 0',
					}}
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

interface ContentProps {
	businessCosts: BusinessCostEntity[]
}

function Content({businessCosts}: ContentProps) {
	const nameRef = useRef<HTMLInputElement>(null)
	const amountRef = useRef<HTMLInputElement>(null)

	const [date, setDate] = useState(dayjs())

	const [rows, setRows] = useState<BusinessCostEntity[]>(businessCosts)

	const onSaveBusinessCost = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const amount: number = amountRef.current?.value ? parseInt(amountRef.current?.value) : 0
		const name: string = nameRef.current?.value!
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
	}

	const onRemove = async (index: number, id: number) => {
		setRows([...rows.slice(0, index), ...rows.slice(index + 1)])
		await deleteBusinessCost(id)
	}

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				<TableContainer component={Paper} sx={{maxWidth: '800px', margin: '24px 0'}}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											gap: '40px',
										}}
										component="form"
										onSubmit={onSaveBusinessCost}
									>
										<TextField
											placeholder="???????????????? ????????????????"
											inputRef={nameRef}
											variant="standard"
											fullWidth={true}
											autoComplete="off"
										/>
										<DatePickerContainer>
											<DatePicker
												label="????????"
												value={date}
												onChange={newValue => {
													if (newValue) {
														setDate(newValue)
													}
												}}
												renderInput={params => <TextField {...params} />}
											/>
										</DatePickerContainer>
										<TextField
											inputRef={amountRef}
											margin="none"
											required
											type="number"
											defaultValue={0}
											label="??????????"
											sx={{
												flex: '160px 0 0',
											}}
										/>
										<IconButton
											type="submit"
										>
											<AddCircleOutline/>
										</IconButton>
									</Box>
								</TableCell>
							</TableRow>
							{rows.map((row, index) => (
								<Row
									key={row.id}
									cost={row}
									onRemove={() => onRemove(index, row.id!)}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}

export default function CostsPage() {
	const {data: businessCosts} = useBusinessCosts()

	if (!businessCosts)
		return null

	return <Content businessCosts={businessCosts}/>
}