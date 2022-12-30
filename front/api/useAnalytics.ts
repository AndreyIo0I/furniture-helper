import dayjs, {Dayjs} from 'dayjs'
import {analyticsApi} from './api'
import {
	OutdatedProjectDto,
	OutdatedProjectsDto,
	Period,
	ProjectMarginDto,
	ProjectPriceDto,
	ProjectsMagrinDto,
	ProjectsPricesDto,
	SpendingOnCostDto,
} from './typescript-fetch-client-generated'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'

/* Сущности для аналитики */
export interface SearchAnalyticParams {
	name: string,
	period: PeriodParams
}

export interface PeriodParams {
	startDate: string,
	endDate: string
}

/* ###################### */

/* Цены по проектам */
export interface ProjectsPrices {
	averagePrice: string,
	projectPrices: Array<ProjectPrice> | undefined
	maxProjectPrice: ProjectPrice | undefined
	minProjectPrice: ProjectPrice | undefined
}

export interface ProjectPrice {
	projectName: string
	projectPrice: string
}

export const mapProjectsPricesDto = (projectsPrices: ProjectsPricesDto): ProjectsPrices => ({
	averagePrice: projectsPrices.averagePrice!.toString(),
	projectPrices: projectsPrices.projectPrices?.map(mapProjectPriceDto),
	minProjectPrice: mapProjectPriceDto(projectsPrices.minProjectPrice!),
	maxProjectPrice: mapProjectPriceDto(projectsPrices.maxProjectPrice!),
})

export const mapProjectPriceDto = (projectPrice: ProjectPriceDto): ProjectPrice => ({
	projectName: projectPrice?.projectName!,
	projectPrice: projectPrice?.projectPrice!.toString(),
})

export function getProjectsPrices(params: PeriodParams) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsProjectsPricesPost(params))
}

/* ##################### */

/* Траты на издержки */
export interface SpendingOnCosts {
	spendingOnCosts: Array<SpendingOnCost> | undefined
}

export interface SpendingOnCost {
	name: string | undefined
	amount: string | undefined
}

export const mapSpendingOnCostsDto = (spendingOnCosts: SpendingOnCostDto[]): SpendingOnCosts => ({
	spendingOnCosts: spendingOnCosts.map(mapSpendingOnCostDto),
})

export const mapSpendingOnCostDto = (spendingOnCost: SpendingOnCostDto): SpendingOnCost => ({
	name: spendingOnCost?.name!,
	amount: spendingOnCost?.amount?.toString(),
})

export function getSpendingOnCosts(params: SearchAnalyticParams) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsSpendingOnCostsPost(params))
}

/* ##################### */

/* Просроченные проекты */
export interface OutdatedProjects {
	outdatedProjects: Array<OutdatedProject> | undefined
	period: ProjectPeriod | undefined
	averageAmount: string | undefined
}

export interface OutdatedProject {
	startDate: Dayjs
	deadLine: Dayjs
	name: string
	wastedDays: number
}

export interface ProjectPeriod {
	startDate: Dayjs
	endDate: Dayjs
}

export const mapOutdatedProjectsDto = (outdatedProjects: OutdatedProjectsDto): OutdatedProjects => ({
	outdatedProjects: outdatedProjects.outdatedProjects?.map(mapOutdatedProjectDto),
	period: mapProjectPeriodDto(outdatedProjects.period!),
	averageAmount: outdatedProjects?.averageAmount?.toString(),
})

export const mapOutdatedProjectDto = (outdatedProject: OutdatedProjectDto): OutdatedProject => ({
	startDate: dayjs(outdatedProject?.startDate!),
	deadLine: dayjs(outdatedProject?.deadLine!),
	name: outdatedProject?.projectName!,
	wastedDays: outdatedProject?.wastedDays!,
})

export const mapProjectPeriodDto = (period: Period): ProjectPeriod => ({
	startDate: dayjs(period?.startDate!),
	endDate: dayjs(period?.endDate!),
})

export function getOutdatedProjects(params: SearchAnalyticParams) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsOutDatedProjectsPost(params))
}

/* ##################### */

/* Маржа по проектам за период */
export interface ProjectsMargin {
	projectMargins: Array<ProjectMargin> | undefined
	period: ProjectPeriod | undefined
	totalMargin: string | undefined
}

export interface ProjectMargin {
	startDate: Dayjs
	deadline: Dayjs
	name: string | undefined
	margin: string | undefined
}

export const mapProjectsMarginDto = (projectsMargin: ProjectsMagrinDto): ProjectsMargin => ({
	projectMargins: projectsMargin.projectMargins?.map(mapProjectMarginDto),
	period: mapProjectPeriodDto(projectsMargin.period!),
	totalMargin: projectsMargin.totalMargin?.toString(),
})

export const mapProjectMarginDto = (projectMargin: ProjectMarginDto): ProjectMargin => ({
	startDate: dayjs(projectMargin?.projectStartdate!),
	deadline: dayjs(projectMargin?.projectDeadLine!),
	name: projectMargin?.projectName!,
	margin: projectMargin?.projectMargin!.toString(),
})


export function getProjectMargin(params: SearchAnalyticParams) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsMarginPost(params))
}

/* ##################### */

/* Маржа по проекту по ID*/
export function useProjectMarginById(projectId: number) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsMarginProjectIdGet(projectId))
}

/* Норма прибыли по проекту по ID*/
export function useProjectProfitNormById(projectId: number) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsProfitNormProjectIdGet(projectId))
}

/* Норма прибавочной стоимости по проекту по ID*/
export function useProjectRateOfSurplusValueById(projectId: number) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsRateOfSurplusValueProjectIdGet(projectId))
}




