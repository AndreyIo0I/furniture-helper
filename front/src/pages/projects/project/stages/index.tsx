import {ExpandLess, ExpandMore} from '@mui/icons-material'
import {
	Button,
	Checkbox,
	Collapse,
	Container,
	FormControlLabel,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, {useEffect, useRef, useState} from 'react'
import saveStage from '../../../../../api/saveStage'
import useStages, {Stage} from '../../../../../api/useStages'
import MainNav from '../../../../components/MainNav'
import ProjectSecondaryNav from '../../../../components/ProjectSecondaryNav'
import {isDeepEqual} from '../../../../helpers'
import styles from './styles.module.css'

interface ProjectStagesPageProps {
	projectId: number
}

interface ProjectStageProps {
	stage: Stage
	onChange: (stage: Stage) => void
}

function ProjectStage({
	stage,
	onChange,
}: ProjectStageProps) {
	const [open, setOpen] = useState(false)
	const [isCompleted, setIsCompleted] = useState(stage.isCompleted)
	const [completedOn, setCompletedOn] = useState(dayjs())
	const [description, setDescription] = useState(stage.description)

	useEffect(() => {
		onChange({
			...stage,
			description,
			isCompleted,
			completedOn: isCompleted ? completedOn.toDate() : null,
		})
	})

	return (
		<>
			<TableRow
				style={{
					background: isCompleted ? 'lightgreen' : 'white',
				}}
			>
				<TableCell
					onClick={() => setOpen(!open)}
					sx={{cursor: 'pointer'}}
				>
					<IconButton>
						{open ? <ExpandLess/> : <ExpandMore/>}
					</IconButton>
				</TableCell>
				<TableCell
					sx={{cursor: 'pointer'}}
					onClick={() => setOpen(!open)}
					component="th"
					scope="row"
					className={styles.col_stage_name}
				>
					{stage.name}
				</TableCell>
				<TableCell className={styles.col_content_sized}>
					<FormControlLabel
						control={<Checkbox/>}
						label="Завершить этап"
						labelPlacement="start"
						checked={isCompleted}
						onChange={() => {
							setIsCompleted(!isCompleted)
						}}
					/>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					colSpan={3}
					style={{paddingBottom: 0, paddingTop: 0}}
				>
					<Collapse in={open}>
						<DatePicker
							label="Дата завершения"
							value={completedOn}
							onChange={newValue => {
								if (newValue) {
									setCompletedOn(newValue)
								}
							}}
							renderInput={params => (
								<TextField {...params} margin="normal" />
							)}
						/>
						<TextField
							value={description}
							onChange={event => setDescription(event.target.value)}
							margin="normal"
							label="Описание"
							multiline
							minRows={4}
							maxRows={16}
							fullWidth
							style={{marginBottom: 24}}
						/>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}

export default function ProjectStagesPage(props: ProjectStagesPageProps) {
	const {data: stages} = useStages(props.projectId)
	const stagesRef = useRef<Stage[]>()
	if (!stagesRef.current)
		stagesRef.current = stages

	const changedStagesRef = useRef<Record<number, Stage>>({})

	const onSave = () => {
		Object.values(changedStagesRef.current).forEach(async newStage => {
			const stageIndex = stagesRef.current && stagesRef.current.findIndex(stage => stage.id === newStage.id)!
			if (stagesRef.current && stageIndex && !isDeepEqual(newStage, stagesRef.current[stageIndex])) {
				stagesRef.current[stageIndex] = newStage
				await saveStage(newStage)
			}
		})
	}

	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<Container maxWidth="lg">
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						variant="contained"
						sx={{
							my: 2,
						}}
						onClick={onSave}
					>
						Сохранить
					</Button>
				</div>
				<TableContainer
					component={Paper}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={styles.col_content_sized}/>
								<TableCell className={styles.col_stage_name}>Этап</TableCell>
								<TableCell className={styles.col_content_sized}/>
							</TableRow>
						</TableHead>
						<TableBody>
							{stagesRef.current && stagesRef.current.map(stage => (
								<ProjectStage
									key={stage.id}
									stage={stage}
									onChange={newStage => {
										changedStagesRef.current[stage.id] = newStage
									}}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}
