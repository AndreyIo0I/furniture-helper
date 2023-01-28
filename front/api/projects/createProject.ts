import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

interface CreateProjectParams {
	name: string;
	contractNumber: string;
	dateOfStart: string;
	deadLine: string;
	clientId: number;
	description: string;
}

export default function createProject(params: CreateProjectParams) {
	return makeAuthenticatedReq(() => projectApi.projectsPost(params))
}