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
import React, {useRef, useState} from 'react'
import saveStage from '../../../../../api/saveStage'
import useStages, {Stage} from '../../../../../api/useStages'
import MainNav from '../../../../components/MainNav'
import ProjectSecondaryNav from '../../../../components/ProjectSecondaryNav'
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
	const descriptionRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton
						onClick={() => setOpen(!open)}
					>
						{open ? <ExpandLess/> : <ExpandMore/>}
					</IconButton>
				</TableCell>
				<TableCell
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
						checked={stage.isCompleted}
					/>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					colSpan={3}
					style={{ paddingBottom: 0, paddingTop: 0 }}
				>
					<Collapse in={open}>
						<TextField
							inputRef={descriptionRef}
							margin="normal"
							label="Описание"
							multiline
							minRows={4}
							maxRows={16}
							fullWidth
						/>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}

export default function ProjectStagesPage(props: ProjectStagesPageProps) {
	const {data: stages} = useStages(props.projectId)

	const changedStagesRef = useRef<Stage[]>([])

	const onSave = () => {
		changedStagesRef.current.forEach(stage => saveStage(stage))
	}

	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<Container maxWidth="lg">
				<TableContainer
					component={Paper}
					sx={{
						mt: 3,
					}}
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
							{stages && stages.map(stage => (
								<ProjectStage
									key={stage.id}
									stage={stage}
									onChange={() => {}}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="contained"
					sx={{
						my: 2,
					}}
					onClick={onSave}
					disabled={!changedStagesRef.current.length}
				>
					Сохранить
				</Button>
			</Container>
		</>
	)
}
