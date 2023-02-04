import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'
import {mapToProjectDto, Project} from './useProjects'

type SaveProjectParams = Omit<Project, 'isCompleted'>

export default function saveProject(params: SaveProjectParams) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdProjectUpdatingPost(mapToProjectDto(params), params.id),
	)
}