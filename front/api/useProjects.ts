import useSWR from 'swr'
import {projectApi} from './api'

export default function useProjects() {
	return useSWR('useProjects', () => projectApi.projectsGet())
}