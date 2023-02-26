import {Table, TableBody} from '@mui/material'
import {ProjectBudget} from '../../../../../api/projects/useProjectBudget'
import * as model from './model'
import ProjectStage, {saveProjectStage} from './project'

export async function saveGroupStage(
	group: model.GroupStage,
	contract: model.Contract,
	projectId: number,
	apiBudget: ProjectBudget,
) {
	for (const stage of group.stages) {
		if (stage.hasChangesInModel) {
			await saveProjectStage(stage, contract, projectId, apiBudget)
		}
	}
}

interface GroupStageProps {
	projectId: number,
	contract: model.Contract,
	stage: model.GroupStage,
	setContract: (contract: model.Contract) => void,
	setStage: (stage: model.GroupStage) => void,
}

export default function GroupStage(props: GroupStageProps) {
	function setStage(stage: model.ProjectStage) {
		const stages = props.stage.stages.map(oldStage =>
			oldStage.id === stage.id ? stage : oldStage,
		)
		props.setStage({
			...props.stage,
			isCompleted: stages.every(stage => stage.isCompleted),
			stages,
		})
	}

	return (
		<Table>
			<TableBody>
				{props.stage.stages.map(stage => (
					<ProjectStage
						key={stage.id}
						projectId={props.projectId}
						contract={props.contract}
						stage={stage}
						setContract={props.setContract}
						setStage={setStage}
					/>
				))}
			</TableBody>
		</Table>
	)
}
