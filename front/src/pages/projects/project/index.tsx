import {Autocomplete, Box, Container, TextField} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import {Button} from 'antd'
import * as React from 'react'
import {useRef, useState} from 'react'
import useClients, {Client} from '../../../../api/clients/useClients'
import completeProject from '../../../../api/projects/completeProject'
import saveProject from '../../../../api/projects/saveProject'
import useProject from '../../../../api/projects/useProject'
import {Project} from '../../../../api/projects/useProjects'
import MainLayout from '../../../components/MainLayout'

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
	const [startDate, setStartDate] = useState(project.dateOfStart || null)
	const [finishDate, setFinishDate] = useState(project.dateOfFinish || null)
	const contractRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLInputElement>(null)
	const [isCompleted, setIsCompleted] = useState(project.isCompleted)

	const onCompleteProject = async () => {
		// что с не сохраненными изменениями?
		setIsCompleted(true)
		await completeProject(project.id) // TODO: добавить "вы уверены?"
	}

	const onSaveProject = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault()
		await saveProject({
			id: project.id,
			projectType: nameRef.current!.value,
			contractNumber: contractRef.current!.value,
			dateOfStart: startDate,
			dateOfFinish: finishDate,
			clientId: clientIdRef.current!,
			description: descriptionRef.current!.value,
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
						label="Тип проекта"
						autoFocus
						defaultValue={project.projectType}
						sx={{
							width: '100%',
						}}
						disabled={isCompleted}
					/>
					<Button
						onClick={() => onCompleteProject()}
						type="primary"
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
						type="primary"
						htmlType="submit"
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
		<MainLayout projectId={props.projectId}>
			<Container maxWidth="lg">
				{project && clients && <Content project={project} clients={clients}/>}
			</Container>
		</MainLayout>
	)
}
