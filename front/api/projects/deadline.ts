import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function deadline(projectId: number, date: Date) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdDeadlinePost(projectId, date),
	)
}