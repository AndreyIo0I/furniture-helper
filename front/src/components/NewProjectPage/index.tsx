import {DatePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import {useRef, useState} from 'react'
import * as React from 'react'
import createProject from '../../../api/createProject'
import useClients from '../../../api/useClients'
import MainNav from '../MainNav'
import {useRouter} from 'next/router'
import {Autocomplete, Box, Button, Container, TextField} from '@mui/material'
import styles from './styles.module.css'

const DEFAULT_PROJECT_DURATION_IN_DAYS = 42

export default function NewProjectPage() {
	const router = useRouter()

	const nameRef = useRef<HTMLInputElement>(null)
	const clientIdRef = useRef<number|null>(null)
	const [startDate, setStartDate] = useState(dayjs())
	const [finishDate, setFinishDate] = useState(dayjs().add(DEFAULT_PROJECT_DURATION_IN_DAYS, 'day'))
	const contractRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLInputElement>(null)

	const {data: clients} = useClients()

	const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const newProjectId = await createProject({
			name: nameRef.current!.value,
			contractNumber: contractRef.current!.value,
			dateOfStart: startDate.toISOString(),
			deadLine: finishDate.toISOString(),
			clientId: clientIdRef.current!,
			description: descriptionRef.current!.value,
		})
		await router.push(`/project/${encodeURIComponent(newProjectId)}`)
	}

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				<Box
					component="form"
					onSubmit={createNewProject}
					className={styles.form}
				>
					<TextField
						inputRef={nameRef}
						margin="none"
						required
						label="Название проекта"
						autoFocus
					/>
					<Autocomplete
						disablePortal
						onChange={(event, newValue) => {
							if (newValue) {
								clientIdRef.current = newValue.id
							}
						}}
						options={clients
							? clients.map(client => ({
								label: client.fullName,
								id: client.id,
							}))
							: []
						}
						sx={{width: 300}}
						renderInput={(params) => <TextField {...params} label="Клиент"/>}
					/>
					<DatePicker
						label="Дата начала"
						value={startDate}
						onChange={newValue => {
							if (newValue) {
								setStartDate(newValue)
							}
						}}
						renderInput={params => <TextField {...params} />}
					/>
					<DatePicker
						label="Дата планируемого завершения"
						value={finishDate}
						onChange={newValue => {
							if (newValue) {
								setFinishDate(newValue)
							}
						}}
						renderInput={params => <TextField {...params} />}
					/>
					<TextField
						inputRef={contractRef}
						margin="none"
						required
						label="Номер контракта"
					/>
					<TextField
						inputRef={descriptionRef}
						margin="none"
						label="Описание"
						multiline
						minRows={4}
						maxRows={16}
					/>
					<div>
						<Button
							type="submit"
							variant="contained"
							className={styles.button}
						>
							Создать
						</Button>
					</div>
				</Box>
			</Container>
		</>
	)
}