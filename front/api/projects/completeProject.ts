import {projectApi} from '../api'
import {makeAuthenticatedReq} from '../useAuthenticatedSWR'

export default function completeProject(id: number) {
	return makeAuthenticatedReq(
		() => projectApi.projectsProjectIdCompletePost(id),
	)
}