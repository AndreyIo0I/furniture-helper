import {Autocomplete, Box, Button, Container, TextField} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import * as React from 'react'
import {useRef, useState} from 'react'
import saveProject from '../../../../api/saveProject'
import useClients, {Client} from '../../../../api/useClients'
import useProject from '../../../../api/useProject'
import {Project} from '../../../../api/useProjects'
import MainNav from '../../../components/MainNav'
import ProjectSecondaryNav from '../../../components/ProjectSecondaryNav'

interface ContentProps {
	project: Project
	clients: Client[]
}

interface ClientOption {
	id: number
	label: string
}

const areClientsEqual = (a: ClientOption, b: ClientOption) => a.id === b.id

function Content({
	project,
	clients,
}: ContentProps) {
	const nameRef = useRef<HTMLInputElement>(null)
	const clientIdRef = useRef<number>(project.clientId)
	const [startDate, setStartDate] = useState(project.dateOfStart)
	const [finishDate, setFinishDate] = useState(project.dateOfFinish)
	const contractRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLInputElement>(null)
	const [isCompleted, setIsCompleted] = useState(project.isCompleted)

	const onSaveProject = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await saveProject({
			id: project.id,
			name: nameRef.current!.value,
			contractNumber: contractRef.current!.value,
			dateOfStart: startDate,
			dateOfFinish: finishDate,
			clientId: clientIdRef.current!,
			description: descriptionRef.current!.value,
			isCompleted,
		})
	}

	const clientsOptions = clients.map(client => ({
		label: client.fullName,
		id: client.id,
	}))

	return (
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
				onSubmit={onSaveProject}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '24px',
					}}
				>
					<TextField
						inputRef={nameRef}
						margin="none"
						required
						label="Название проекта"
						autoFocus
						defaultValue={project.name}
						sx={{
							width: '100%',
						}}
						disabled={isCompleted}
					/>
					<Button
						onClick={() => setIsCompleted(!isCompleted)}
						variant="contained"
						disabled={project.isCompleted}
					>
						Завершить
					</Button>
				</div>
				<Autocomplete
					disablePortal
					onChange={(event, newValue) => {
						if (newValue) {
							clientIdRef.current = newValue.id
						}
					}}
					options={clientsOptions}
					sx={{width: 300}}
					defaultValue={clientsOptions.find(v => v.id === project.clientId)}
					renderInput={(params) => <TextField {...params} label="Клиент"/>}
					isOptionEqualToValue={areClientsEqual}
					disabled={isCompleted}
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
					disabled={isCompleted}
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
					disabled={isCompleted}
				/>
				<TextField
					inputRef={contractRef}
					margin="none"
					required
					label="Номер контракта"
					defaultValue={project.contractNumber}
					disabled={isCompleted}
				/>
				<TextField
					inputRef={descriptionRef}
					margin="none"
					label="Описание"
					multiline
					minRows={4}
					maxRows={16}
					defaultValue={project.description}
					disabled={isCompleted}
				/>
				<div>
					<Button
						type="submit"
						variant="contained"
						disabled={project.isCompleted}
					>
						Сохранить
					</Button>
				</div>
			</Box>
		</Container>
	)
}

interface ProjectPageProps {
	projectId: number
}

export default function ProjectPage(props: ProjectPageProps) {
	const {data: project} = useProject(props.projectId)
	const {data: clients} = useClients()

	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<Container maxWidth="lg">
				{project && clients && <Content project={project} clients={clients}/>}
			</Container>
		</>
	)
}
