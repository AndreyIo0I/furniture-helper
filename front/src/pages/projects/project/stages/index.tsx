import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import {Button} from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import useProjectBudget, {ProjectBudget} from '../../../../../api/projects/useProjectBudget'
import useStages, {Stage} from '../../../../../api/useStages'
import MainLayout from '../../../../components/MainLayout'
import {saveChangesWithMsg} from '../../../../saveChangesWithMsg'
import * as model from './model'
import ProjectStage, {saveProjectStage} from './project'
import styles from './styles.module.css'

const mapToDayjs = (date: Date | null) => dayjs(date || undefined)

function mapToProjectStagesViewModel(apiStages: Stage[]): model.ProjectStage[] {
	const projectStages: model.ProjectStage[] = []
	let productionGroup: model.GroupStage | undefined

	for (const apiStage of apiStages) {
		switch (apiStage.projectStageCode!.toLowerCase()) {
			case 'contract':
				projectStages.push({
					stageType: model.StageType.Contract,
					id: apiStage.id,
					name: apiStage.name,
					isCompleted: apiStage.isCompleted,
					completedOn: mapToDayjs(apiStage.completedOn),
					description: apiStage.description,
					hasChangesInModel: false,
				})
				break
			case 'production':
				if (productionGroup === undefined) {
					projectStages.push(productionGroup = {
						stageType: model.StageType.Group,
						id: apiStage.id,
						name: 'Производство',
						isCompleted: true,
						stages: [],
						hasChangesInModel: false,
					})
				}
				productionGroup.isCompleted &&= apiStage.isCompleted
				productionGroup.stages.push({
					stageType: model.StageType.Generic,
					id: apiStage.id,
					name: apiStage.name,
					isCompleted: apiStage.isCompleted,
					completedOn: mapToDayjs(apiStage.completedOn),
					description: apiStage.description,
					hasChangesInModel: false,
				})
				break
			case 'payment':
				projectStages.push({
					stageType: model.StageType.Payment,
					id: apiStage.id,
					name: apiStage.name,
					isCompleted: apiStage.isCompleted,
					completedOn: mapToDayjs(apiStage.completedOn),
					description: apiStage.description,
					hasChangesInModel: false,
				})
				break
			default:
				projectStages.push({
					stageType: model.StageType.Generic,
					id: apiStage.id,
					name: apiStage.name,
					isCompleted: apiStage.isCompleted,
					completedOn: mapToDayjs(apiStage.completedOn),
					description: apiStage.description,
					hasChangesInModel: false,
				})
		}
	}
	return projectStages
}

interface ContentProps {
	projectId: number
	apiStages: Stage[]
	apiBudget: ProjectBudget
	mutate: () => void
}

function Content(props: ContentProps) {
	const [contract, setContract] = React.useState<model.Contract>({})
	const [stages, setStages] = React.useState(
		() => mapToProjectStagesViewModel(props.apiStages)
	)

	const resetHasChangesFlag = (stages: model.ProjectStage[]): model.ProjectStage[] => (
		stages.map(stage => (
			stage.stageType === model.StageType.Group ? {
				...stage,
				stages: resetHasChangesFlag(stage.stages),
				hasChangesInModel: false,
			} : {
				...stage,
				hasChangesInModel: false,
			}
		))
	)

	function setStage(stage: model.ProjectStage) {
		setStages(stages.map(oldStage =>
			oldStage.id === stage.id ? stage : oldStage,
		))
	}

	function saveStages() {
		saveChangesWithMsg(async () => {
			try {
				for (const stage of stages) {
					if (stage.hasChangesInModel) {
						await saveProjectStage(stage, contract, props.projectId, props.apiBudget)
					}
				}
				setStages(resetHasChangesFlag(stages))
			} finally {
				props.mutate()
			}
		})
	}

	return (
		<MainLayout projectId={props.projectId}>
			<Container maxWidth="lg">
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						type="primary"
						style={{margin: '16px 0'}}
						onClick={saveStages}
						disabled={stages.every(stage => !stage.hasChangesInModel)}
					>
						Сохранить
					</Button>
				</div>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={styles.col_content_sized}/>
								<TableCell className={styles.col_stage_name}>Этап</TableCell>
								<TableCell className={styles.col_content_sized}/>
							</TableRow>
						</TableHead>
						<TableBody>
							{stages.map(stage => (
								<ProjectStage
									key={stage.id}
									projectId={props.projectId}
									contract={contract}
									stage={stage}
									setContract={setContract}
									setStage={setStage}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</MainLayout>
	)
}

interface ProjectStagesPageProps {
	projectId: number
}

export default function ProjectStagesPage(props: ProjectStagesPageProps) {
	const {data: apiStages, mutate: mutateStages} = useStages(props.projectId)
	const {data: apiBudget, mutate: mutateBudget} = useProjectBudget(props.projectId)

	if (!apiStages || !apiBudget)
		return null

	return (
		<Content
			projectId={props.projectId}
			apiStages={apiStages}
			apiBudget={apiBudget}
			mutate={() => {
				mutateStages()
				mutateBudget()
			}}
		/>
	)
}
