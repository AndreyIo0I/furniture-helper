import {Autocomplete, Box, Button, Container, TextField} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import createProject from '../../../../api/createProject'
import useAccountSettings from '../../../../api/useAccountSettings'
import useClients from '../../../../api/clients/useClients'
import MainNav from '../../../components/MainNav'

const DEFAULT_PROJECT_DURATION_IN_DAYS = 42

export default function NewProjectPage() {
	const router = useRouter()

	const nameRef = useRef<HTMLInputElement>(null)
	const clientIdRef = useRef<number | null>(null)
	const [startDate, setStartDate] = useState(dayjs())
	const [finishDate, setFinishDate] = useState(dayjs().add(DEFAULT_PROJECT_DURATION_IN_DAYS, 'day'))
	const contractRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLInputElement>(null)

	const {data: accountSettings} = useAccountSettings()

	useEffect(() => {
		if (accountSettings) {
			setFinishDate(dayjs().add(accountSettings.defaultProjectDurationDays, 'day'))
		}
	}, [accountSettings])

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
		await router.push(`/projects/${encodeURIComponent(newProjectId)}`)
	}

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: 'grid',
						gridTemplate: 'auto / 1fr',
						maxWidth: '600px',
						gap: '16px',
						padding: '20px 0',
					}}
					component="form"
					onSubmit={createNewProject}
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
						>
							Создать
						</Button>
					</div>
				</Box>
			</Container>
		</>
	)
}