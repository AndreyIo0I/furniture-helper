import useSWR, {SWRResponse} from 'swr'
import {projectStageApi} from './api'
import {ProjectStage} from './typescript-fetch-client-generated'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface Stage {
	id: number;
	projectId: number;
	name: string;
	description: string;
	completedOn?: Date;
	isCompleted: boolean;
}

const mapStageDto = (dto: ProjectStage): Stage => ({
	id: dto.id!,
	projectId: dto.projectId!,
	name: dto.name!,
	description: dto.description!,
	completedOn: dto.completedOn,
	isCompleted: !!dto.isCompleted,
})

export default function useStages(projectId: number): SWRResponse<Stage[]> {
	return useAuthenticatedSWR(
		useSWR(
			'useStages' + projectId,
			async () => (await projectStageApi.projectStagesProjectIdGet(projectId)).map(mapStageDto),
		),
	)
}