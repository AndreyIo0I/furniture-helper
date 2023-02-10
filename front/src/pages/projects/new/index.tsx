import {Autocomplete, Box, Container, TextField} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import { Button } from 'antd'
import dayjs from 'dayjs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import useClients from '../../../../api/clients/useClients'
import createProject from '../../../../api/projects/createProject'
import useAccountSettings from '../../../../api/useAccountSettings'
import MainLayout from '../../../components/MainLayout'
import NewClientPopup from '../../../components/NewClientPopup'

const DEFAULT_PROJECT_DURATION_IN_DAYS = 42

export default function NewProjectPage() {
	const router = useRouter()

	const [isNewClientPopupOpen, setIsNewClientPopupOpen] = useState(false)

	const nameRef = useRef<HTMLInputElement>(null)
	const clientIdRef = useRef<number | null>(null)
	const [startDate, setStartDate] = useState(dayjs())
	const [finishDate, setFinishDate] = useState(dayjs().add(DEFAULT_PROJECT_DURATION_IN_DAYS, 'day'))
	const addressRef = useRef<HTMLInputElement>(null)
	const contractRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLInputElement>(null)

	const {data: accountSettings} = useAccountSettings()

	useEffect(() => {
		if (accountSettings) {
			setFinishDate(dayjs().add(accountSettings.defaultProjectDurationDays, 'day'))
		}
	}, [accountSettings])

	const {data: clients, mutate: updateClients} = useClients()

	const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const newProjectId = await createProject({
			projectType: nameRef.current!.value,
			address: addressRef.current!.value,
			contractNumber: contractRef.current!.value,
			dateOfStart: startDate.toISOString(),
			deadLine: finishDate.toISOString(),
			clientId: clientIdRef.current!,
			description: descriptionRef.current!.value,
		})
		await router.push(`/projects/${encodeURIComponent(newProjectId)}`)
	}

	return (
		<MainLayout>
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
						label="Тип проекта"
						autoFocus
					/>
					<div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
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
							renderInput={params => <TextField {...params} label="Клиент"/>}
						/>
						<Button
							onClick={() => setIsNewClientPopupOpen(true)}
							type="primary"
						>
							Добавить клиента
						</Button>
					</div>
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
						inputRef={addressRef}
						margin="none"
						label="Адрес"
					/>
					<TextField
						inputRef={contractRef}
						margin="none"
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
							htmlType="submit"
							type="primary"
						>
							Создать
						</Button>
					</div>
				</Box>
			</Container>
			<NewClientPopup
				open={isNewClientPopupOpen}
				onCancel={() => {
					updateClients()
					setIsNewClientPopupOpen(false)
				}}
			/>
		</MainLayout>
	)
}