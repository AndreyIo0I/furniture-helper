import {ClientApi, CostApi, ProjectApi, ProjectBudgetApi} from './typescript-fetch-client-generated'

const basePath = '/api'

export const projectApi = new ProjectApi({}, basePath)
export const clientApi = new ClientApi({}, basePath)
export const costApi = new CostApi({}, basePath)
export const projectBudgetApi = new ProjectBudgetApi({}, basePath)