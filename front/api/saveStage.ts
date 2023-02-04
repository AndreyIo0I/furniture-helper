import {projectStageApi} from './api'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'
import {Stage} from './useStages'

export default function saveStage(stage: Stage) {
	return makeAuthenticatedReq(
		() =>  projectStageApi.projectStagesProjectStageIdProjectStageUpdatingPost({
			...stage,
			completedOn: stage.completedOn || undefined,
		}, stage.id),
	)
}