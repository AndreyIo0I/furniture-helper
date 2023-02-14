import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {projectApi} from '../api'
import {ProjectDto} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'

export interface Project {
	id: number
	projectType: string
	contractNumber: string
	dateOfStart: Dayjs|null
	dateOfFinish: Dayjs|null
	endDate?: Dayjs|null
	clientId: number
	description: string
	isCompleted?: boolean
}

export const mapProjectDto = (dto: ProjectDto): Project => ({
	id: dto.id!,
	projectType: dto.projectType!,
	contractNumber: dto.contractNumber!,
	dateOfStart: dto.dateOfStart ? dayjs(dto.dateOfStart) : null,
	dateOfFinish: dto.deadLine ? dayjs(dto.deadLine) : null,
	endDate: dto.endDate ? dayjs(dto.endDate) : null,
	clientId: dto.clientId!,
	description: dto.description!,
	isCompleted: dto.isCompleted!,
})

export const mapToProjectDto = (project: Project): ProjectDto => ({
	id: project.id,
	projectType: project.projectType,
	contractNumber: project.contractNumber,
	dateOfStart: project.dateOfStart?.toISOString(),
	deadLine: project.dateOfFinish?.toISOString(),
	endDate: project.endDate?.toISOString(),
	clientId: project.clientId,
	description: project.description,
	isCompleted: project.isCompleted,
})

export default function useProjects(): SWRResponse<Project[]> {
	return useAuthenticatedSWR(
		useSWR('useProjects', async () => (await projectApi.projectsGet()).map(mapProjectDto)),
	)
}
