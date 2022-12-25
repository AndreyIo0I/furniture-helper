import {DatePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import {useRef, useState} from 'react'
import * as React from 'react'
import createProject from '../../../api/createProject'
import MainNav from '../MainNav'
import {useRouter} from 'next/router'
import {Box, Button, Container, TextField} from '@mui/material'
import styles from './styles.module.css'

export default function NewProjectPage() {
	const router = useRouter()

	const nameRef = useRef<HTMLInputElement>(null)
	const [startDate, setStartDate] = useState(dayjs())
	const [finishDate, setFinishDate] = useState(dayjs())
	const contractRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLInputElement>(null)

	const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const newProjectId = await createProject({
			name: nameRef.current!.value,
			contractNumber: contractRef.current!.value,
			dateOfStart: startDate.toISOString(),
			deadLine: finishDate.toISOString(),
			clientId: 1,
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