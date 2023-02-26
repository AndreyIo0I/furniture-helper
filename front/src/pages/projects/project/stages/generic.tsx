import saveStage from '../../../../../api/saveStage'
import {CommonStageFields, mapToApiStage} from './common'
import * as model from './model'

export function saveGenericStage(stage: model.GenericStage, projectId: number) {
	return saveStage(mapToApiStage(stage, projectId))
}

export default CommonStageFields<model.GenericStage>
