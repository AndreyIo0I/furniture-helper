import {ExpandMore} from '@mui/icons-material'
import {
	Button,
	Container,
	IconButton,
	Paper,
	SxProps,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import MainNav from '../../../../components/MainNav'
import ProjectSecondaryNav from '../../../../components/ProjectSecondaryNav'
import styles from './styles.module.css'

interface ProjectStagesPageProps {
	projectId: number,
}

enum StageState {
	Open,
	Completed,
}

interface StageStateButtonProps {
	state: StageState,
}

interface ProjectStageProps {
	name: string,
	state: StageState,
}

const testStages: ProjectStageProps[] = [{
	name: 'Замер',
	state: StageState.Completed,
}, {
	name: 'Дизайн',
	state: StageState.Completed,
}, {
	name: 'Договор',
	state: StageState.Open,
}, {
	name: 'Контрольный замер',
	state: StageState.Completed,
}, {
	name: 'Деталировка',
	state: StageState.Open,
}, {
	name: 'Схемы',
	state: StageState.Open,
}]

const stagesListStyle: SxProps = {
	mt: 3,
}
const saveButtonStyle: SxProps = {
	my: 2,
}

function StageStateButton(props: StageStateButtonProps) {
	switch (props.state) {
	case StageState.Open:
		return (
			<Button
				variant="contained"
				color="secondary"
				fullWidth
			>Завершить этап</Button>
		)
	case StageState.Completed:
		return (
			<Button
				color="secondary"
				fullWidth
				disabled
			>Этап завершён</Button>
		)
	}
}

function ProjectStage(props: ProjectStageProps) {
	return (
		<TableRow>
			<TableCell>
				<IconButton>
					<ExpandMore/>
				</IconButton>
			</TableCell>
			<TableCell
				component="th"
				scope="row"
				className={styles.col_stage_name}
			>
				{props.name}
			</TableCell>
			<TableCell className={styles.col_content_sized}>
				<StageStateButton state={props.state}/>
			</TableCell>
		</TableRow>
	)
}

export default function ProjectStagesPage(props: ProjectStagesPageProps) {
	const stages = testStages

	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			<Container maxWidth="lg">
				<TableContainer
					component={Paper}
					sx={stagesListStyle}
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
							{stages.map(stage => <ProjectStage key={stage.name} {...stage}/>)}
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="contained"
					sx={saveButtonStyle}
				>
					Сохранить
				</Button>
			</Container>
		</>
	)
}
