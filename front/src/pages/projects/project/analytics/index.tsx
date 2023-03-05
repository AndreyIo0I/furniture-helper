import {Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import {Dayjs} from 'dayjs'
import {useEffect, useState} from 'react'
import {
	getProjectSummaryTableById,
	mapProjectSummaryTableDto,
	ProjectSummaryTable,
	TableCostPrice,
	TableStage,
} from '../../../../../api/useAnalytics'

import MainLayout from '../../../../components/MainLayout'

interface ProjectAnalyticsPageProps {
	projectId: number
}

interface ContentProps {
	analytics: ProjectSummaryTable
	projectId: number
}

interface SummaryTableRow {
	contractNumber: string,
	product: string,
	startDate: Dayjs,
	endDate: Dayjs,
	numberDays: number,
	projectCost: number,
	costPrice: TableCostPrice,
	margin: number,
	k1: number,
	k2: number,
	stages: TableStage[]
}

const noData: string = 'Нет данных'

const columns: ColumnsType<SummaryTableRow> = [
	{
		title: '№',
		dataIndex: 'contractNumber',
		key: 'contractNumber',
		render: contractNumber => buildStringValue(contractNumber),
	},
	{
		title: 'Продукт',
		dataIndex: 'product',
		key: 'product',
		render: product => buildStringValue(product),
	},
	{
		title: 'Начало',
		dataIndex: 'startDate',
		key: 'startDate',
		render: startDate => buildDateValue(startDate),
	},
	{
		title: 'Конец',
		dataIndex: 'endDate',
		key: 'endDate',
		render: endDate => buildDateValue(endDate),
	},
	{
		title: 'Кол-во дней',
		dataIndex: 'numberDays',
		key: 'numberDays',
		render: numberDays => buildNumberValue(numberDays),
	},
	{
		title: 'Выручка',
		dataIndex: 'projectCost',
		key: 'projectCost',
		render: projectCost => buildPriceValue(projectCost),
	},
	{
		title: 'Себестоимость',
		dataIndex: 'costPrice',
		key: 'costPrice',
		render: costPrice => buildCostPrice(costPrice),
	},
	{
		title: 'Маржа',
		dataIndex: 'margin',
		key: 'margin',
		render: margin => buildPriceValue(margin),
	},
	{
		title: 'K1',
		dataIndex: 'k1',
		key: 'k1',
		render: k1 => buildNumberValue(k1),
	},
	{
		title: 'K2',
		dataIndex: 'k2',
		key: 'k2',
		render: k2 => buildNumberValue(k2),
	},
	{
		title: 'Этапы',
		dataIndex: 'stages',
		key: 'stages',
		render: stages => buildStages(stages),
	},
]

function buildDataSource(data: ProjectSummaryTable): SummaryTableRow[] {
	const rows: SummaryTableRow[] = []

	const row: SummaryTableRow = {
		contractNumber: data.contractNumber!,
		product: data.projectType!,
		startDate: data.startDate!,
		endDate: data.endDate!,
		numberDays: data.numberOfDays!,
		projectCost: data.projectCost!,
		costPrice: data.costPrice!,
		margin: data.margin!,
		k1: data.profitNorm!,
		k2: data.rateOfSurplusValue!,
		stages: data.stages!,
	}

	rows.push(row)

	return rows
}

function buildStringValue(stringValue: string): string {
	return `${!stringValue ? noData : stringValue}`
}

function buildDateValue(date: Dayjs): string {
	return `${!date ? noData : date.format('DD.MM.YYYY')}`
}

function buildNumberValue(numberValue: number): string {
	return `${!numberValue ? 0 : numberValue.toFixed(3)}`
}

function buildPriceValue(price: number): string {
	const resolvedPrice: number = !price ? 0 : price
	return `${resolvedPrice} ₽`
}

function buildPercentValue(percent: number): string {
	return `${!percent ? '0%' : (percent * 100).toFixed(3)}%`
}

function buildCostPrice(costPrice: TableCostPrice) {
	const resolvedCostPrice = !costPrice.costPrice ? 0 : costPrice.costPrice

	return (
		<div>
			<span>{`Общая сумма: ${buildPriceValue(resolvedCostPrice)}`}</span>
			<br/>
			<br/>
			{costPrice.costs && costPrice.costs.map((tableCost, index) => (
				<div
					key={index}>{`${tableCost.name}:${buildPriceValue(tableCost.amount!)} (${buildPercentValue(tableCost.persent!)})`}</div>
			))}
		</div>
	)
}

function buildStages(stages: TableStage[]) {
	if (!stages || stages.length == 0) {
		return <>{noData}</>
	}

	return (
		<div>
			{stages.map((value, index) => (
				<div key={index}>{value.name}={value.isCompleted ? 1 : 0}</div>
			))}
		</div>
	)
}

function Content(props: ContentProps) {
	return (
		<>
			{props && props.analytics && (
				<Table rowKey="contractNumber" pagination={false} dataSource={buildDataSource(props.analytics)} columns={columns}/>
			)}
		</>
	)
}

export default function ProjectAnalyticsPage(props: ProjectAnalyticsPageProps) {
	const [projectAnalytics, setProjectAnalytics] = useState<ProjectSummaryTable>()

	useEffect(() => {
		getProjectSummaryTableById(props.projectId)
			.then(summaryTableDto => {
				setProjectAnalytics(mapProjectSummaryTableDto(summaryTableDto))
			})
	}, [props.projectId])

	return (
		<MainLayout
			projectId={props.projectId}
		>
			<Content projectId={props.projectId} analytics={projectAnalytics!}/>
		</MainLayout>
	)
}
