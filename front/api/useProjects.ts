import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {projectApi} from './api'
import {ProjectDto} from './typescript-fetch-client-generated'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface Project {
	id: number
	name: string
	clientId: number
	contractNumber: string
	dateOfStart: Dayjs
	dateOfFinish: Dayjs
	description: string
	isCompleted?: boolean
}

export const mapProjectDto = (dto: ProjectDto): Project => ({
	id: dto.id!,
	name: dto.name!,
	clientId: dto.clientId!,
	contractNumber: dto.contractNumber!,
	dateOfStart: dayjs(dto.dateOfStart!),
	dateOfFinish: dayjs(dto.deadLine!),
	description: dto.description!,
	isCompleted: dto.isCompleted!,
})

export const mapToProjectDto = (project: Project): ProjectDto => ({
	id: project.id,
	name: project.name,
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