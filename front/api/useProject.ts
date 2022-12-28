import useSWR, {SWRResponse} from 'swr'
import {projectApi} from './api'
import {ProjectDto} from './typescript-fetch-client-generated'
import useAuthenticatedSWR from './useAuthenticatedSWR'
import {mapProjectDto, Project} from './useProjects'

export default function useProject(projectId: number): SWRResponse<Project> {
	return useAuthenticatedSWR(
		useSWR('useProject', async () => mapProjectDto(await projectApi.projectsProjectIdGet(projectId))),
	)
}