import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {projectApi} from '../api'
import {ProjectDto} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'

export interface Project {
	id: number
	projectType: string
	address: string
	clientId: number
	contractNumber: string
	dateOfStart: Dayjs|null
	dateOfFinish: Dayjs|null
	description: string
	isCompleted?: boolean
}

export const mapProjectDto = (dto: ProjectDto): Project => ({
	id: dto.id!,
	projectType: dto.projectType!,
	address: dto.address!,
	clientId: dto.clientId!,
	contractNumber: dto.contractNumber!,
	dateOfStart: dto.dateOfStart ? dayjs(dto.dateOfApplication) : null,
	dateOfFinish: dto.deadLine? dayjs(dto.deadLine) : null,
	description: dto.description!,
	isCompleted: dto.isCompleted!,
})

export const mapToProjectDto = (project: Project): ProjectDto => ({
	id: project.id,
	projectType: project.projectType,
	address: project.address,
	clientId: project.clientId,
	contractNumber: project.contractNumber,
	dateOfApplication: project.dateOfStart?.toISOString(),
	deadLine: project.dateOfFinish?.toISOString(),
	description: project.description,
	isCompleted: project.isCompleted,
})

export default function useProjects(): SWRResponse<Project[]> {
	return useAuthenticatedSWR(
		useSWR('useProjects', async () => (await projectApi.projectsGet()).map(mapProjectDto)),
	)
}