import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function startDate(projectId: number, startDate: Date) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdStartDatePost(projectId, startDate),
	)
}