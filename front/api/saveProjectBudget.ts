import {projectBudgetApi} from './api'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'
import {ProjectBudget} from './useProjectBudget'

export default function(projectBudget: ProjectBudget) {
	return makeAuthenticatedReq(
		() => projectBudgetApi.projectBudgetsProjectIdProjectBudgetUpdatingPost(
			projectBudget,
			projectBudget.projectId,
		),
	)
}
