import { NumericalIndicatorsDto } from './typescript-fetch-client-generated/api';
import dayjs, {Dayjs} from 'dayjs'
import {analyticsApi, projectApi} from './api'
import {
	CostDto,
	CostPriceDto,
	Period,
	ProjectSummaryTableDto,
	StageDto,
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

/* Сводная таблица по проекту по ID*/
export interface ProjectSummaryTable {
	contractNumber?: string;
	projectType?: string;
	startDate?: Dayjs;
	endDate?: Dayjs;
	numberOfDays?: number;
	projectCost?: number;
	costPrice?: TableCostPrice;
	margin?: number;
	profitNorm?: number;
	rateOfSurplusValue?: number;
	stages?: Array<TableStage>;
}

export interface TableCostPrice {
	costPrice?: number;
	costs?: Array<TableCost>;
} 

export interface TableCost {
	name?: string;
	amount?: number;
	persent?: number;
}

export interface TableStage {
	name?: string;
	isCompleted?: boolean;
}

export function getProjectSummaryTableById(projectId: number) {
	return makeAuthenticatedReq(() => projectApi.projectsProjectIdSummaryTablePost(projectId))
}

export const mapProjectSummaryTableDto = (projectSummaryTableDto: ProjectSummaryTableDto): ProjectSummaryTable => ({
	contractNumber: projectSummaryTableDto.contractNumber,
	projectType: projectSummaryTableDto.projectType,
	startDate: !projectSummaryTableDto?.startDate ? undefined : dayjs(projectSummaryTableDto?.startDate!),
	endDate: !projectSummaryTableDto?.endDate ? undefined : dayjs(projectSummaryTableDto?.endDate!),
	numberOfDays: projectSummaryTableDto.numberOfDays,
	projectCost: projectSummaryTableDto.projectCost,
	costPrice: mapCostPriceDto( projectSummaryTableDto.costPrice! ),
	margin: projectSummaryTableDto.margin,
	profitNorm: projectSummaryTableDto.profitNorm,
	rateOfSurplusValue: projectSummaryTableDto.rateOfSurplusValue,
	stages: projectSummaryTableDto.stages?.map( mapStageDto )
})

const mapCostPriceDto = (costPriceDto: CostPriceDto): TableCostPrice => ({
	costPrice: costPriceDto.costPrice,
	costs: costPriceDto.costs?.map(mapCostDto)
})

const mapCostDto = (costDto: CostDto): TableCost => ({
	amount: costDto.amount,
	name: costDto.name,
	persent: costDto.persent
})

const mapStageDto = (stageDto: StageDto): TableStage => ({
	name: stageDto.name,
	isCompleted: stageDto.isCompleted
})


/* ###################### */

/* Числовые показатели*/
export function getNumericalIndicators(period: Period) {
	return makeAuthenticatedReq(() => analyticsApi.analyticsNumericalIndicatorsPost(period))
}

export interface NumericalIndicators {
		averageCheck?: number;
		averageProductionDays?: number;
		numberOfProducts?: number;
}

export const mapNumericalIndicatorsDto = (numericalIndicatorsDto: NumericalIndicatorsDto): NumericalIndicators => ({
	averageCheck: numericalIndicatorsDto.averageCheck,
	averageProductionDays: numericalIndicatorsDto.averageProductionDays,
	numberOfProducts: numericalIndicatorsDto.numberOfProducts
})


