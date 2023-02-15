import useSWR, {SWRResponse} from 'swr'
import {projectStageApi} from './api'
import useAuthenticatedSWR from './useAuthenticatedSWR'
import {mapStageDto, Stage} from './useStages'

export default function useCurrentStage(projectId: number): SWRResponse<Stage> {
	return useAuthenticatedSWR(
		useSWR(
			'useCurrentStage' + projectId,
			async () => mapStageDto(await projectStageApi.projectStagesProjectIdCurrentGet(projectId)),
		),
	)
}
