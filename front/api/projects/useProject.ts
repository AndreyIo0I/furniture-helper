import useSWR, {SWRResponse} from 'swr'
import {projectApi} from '../api'
import useAuthenticatedSWR from '../useAuthenticatedSWR'
import {mapProjectDto, Project} from './useProjects'

export default function useProject(projectId: number): SWRResponse<Project> {
	return useAuthenticatedSWR(
		useSWR('useProject' + projectId, async () => mapProjectDto(await projectApi.projectsProjectIdGet(projectId))),
	)
}