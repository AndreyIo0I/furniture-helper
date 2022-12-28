import {projectApi} from './api'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'
import {mapToProjectDto, Project} from './useProjects'

export default function saveProject(params: Project) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdProjectUpdatingPost(mapToProjectDto(params), params.id),
	)
}