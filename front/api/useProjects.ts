import useSWR from 'swr'
import {projectApi} from './api'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export default function useProjects() {
	return useAuthenticatedSWR(
		useSWR('useProjects', () => projectApi.projectsGet()),
	)
}