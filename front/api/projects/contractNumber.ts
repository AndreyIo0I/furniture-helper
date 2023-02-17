import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'
import {mapToProjectDto, Project} from './useProjects'

export default function contractNumber(projectId: number, contractNumber: string) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdContractNumberPost(projectId, contractNumber),
	)
}