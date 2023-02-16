import dayjs, {Dayjs} from 'dayjs'
import useSWR, {SWRResponse} from 'swr'
import {projectApi} from '../api'
import {ProjectDto} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'

export interface Project {
	id: number
	projectType: string
	address: string
	contractNumber: string
	dateOfApplication: Dayjs|null
	dateOfStart: Dayjs|null
	deadLine: Dayjs|null
	endDate?: Dayjs|null
	clientId: number
	description: string
	isCompleted?: boolean
}

export const mapProjectDto = (dto: ProjectDto): Project => ({
	id: dto.id!,
	projectType: dto.projectType!,
	address: dto.address!,
	contractNumber: dto.contractNumber!,
	dateOfApplication: dto.dateOfApplication ? dayjs(dto.dateOfApplication) : null,
	dateOfStart: dto.dateOfStart ? dayjs(dto.dateOfStart) : null,
	deadLine: dto.deadLine ? dayjs(dto.deadLine) : null,
	endDate: dto.endDate ? dayjs(dto.endDate) : null,
	clientId: dto.clientId!,
	description: dto.description!,
	isCompleted: dto.isCompleted!,
})

export const mapToProjectDto = (project: Project): ProjectDto => ({
	id: project.id,
	projectType: project.projectType,
	address: project.address,
	contractNumber: project.contractNumber,
	dateOfApplication: project.dateOfApplication?.toISOString(),
	dateOfStart: project.dateOfStart?.toISOString(),
	deadLine: project.deadLine?.toISOString(),
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
