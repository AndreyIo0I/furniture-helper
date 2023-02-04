import {
	AnalyticsApi,
	AuthentificationApi,
	BuisnessCostApi,
	ClientApi,
	CostApi,
	ProjectApi,
	ProjectBudgetApi,
	ProjectDeadlineApi,
	ProjectStageApi,
	UserApi,
} from './typescript-fetch-client-generated'

const basePath = '/api'

export const projectApi = new ProjectApi({}, basePath)
export const clientApi = new ClientApi({}, basePath)
export const costApi = new CostApi({}, basePath)
export const projectBudgetApi = new ProjectBudgetApi({}, basePath)
export const projectDeadlineApi = new ProjectDeadlineApi({}, basePath)
export const authenticationApi = new AuthentificationApi({}, basePath)
export const businessCostApi = new BuisnessCostApi({}, basePath)
export const projectStageApi = new ProjectStageApi({}, basePath)
export const userApi = new UserApi({}, basePath)
export const analyticsApi = new AnalyticsApi({}, basePath)