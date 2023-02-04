import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {projectApi} from '../api'
import {ProjectDto} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'

export interface Project {
	id: number
	projectType: string
	clientId: number
	contractNumber: string
	dateOfStart: Dayjs
	dateOfFinish: Dayjs
	description: string
	isCompleted?: boolean
}

export const mapProjectDto = (dto: ProjectDto): Project => ({
	id: dto.id!,
	projectType: dto.projectType!,
	clientId: dto.clientId!,
	contractNumber: dto.contractNumber!,
	dateOfStart: dayjs(dto.dateOfStart!),
	dateOfFinish: dayjs(dto.deadLine!),
	description: dto.description!,
	isCompleted: dto.isCompleted!,
})

export const mapToProjectDto = (project: Project): ProjectDto => ({
	id: project.id,
	projectType: project.projectType,
	clientId: project.clientId,
	contractNumber: project.contractNumber,
	dateOfStart: project.dateOfStart.toISOString(),
	deadLine: project.dateOfFinish.toISOString(),
	description: project.description,
	isCompleted: project.isCompleted,
})

export default function useProjects(): SWRResponse<Project[]> {
	return useAuthenticatedSWR(
		useSWR('useProjects', async () => (await projectApi.projectsGet()).map(mapProjectDto)),
	)
}