import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

interface CreateProjectParams {
	projectType: string
	address: string
	contractNumber?: string
	dateOfApplication: string
	clientId: number
	description: string
}

export default function createProject(params: CreateProjectParams) {
	return makeAuthenticatedReq(() => projectApi.projectsPost(params))
}