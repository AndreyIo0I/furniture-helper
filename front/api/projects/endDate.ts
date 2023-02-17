import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function endDate(projectId: number, date: Date) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdEndDatePost(projectId, date),
	)
}