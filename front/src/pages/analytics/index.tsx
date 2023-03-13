import {Button, DatePicker, Radio, RadioChangeEvent, Select} from 'antd'
import dayjs, {Dayjs} from 'dayjs'
import {useEffect, useState} from 'react'
import {ChartDto, ChartPeriodType, ChartType} from '../../../api/typescript-fetch-client-generated'
import {
	ChartItem,
	ChartItemWeeks,
	getChartAnalyticsPerDates,
	getChartAnalyticsPerPeriods,
	getNumericalIndicators,
	mapChartItemDto,
	mapChartItemWeeksDto,
	mapNumericalIndicatorsDto,
	NumericalIndicators,
	PeriodItem,
	PeriodParams,
} from '../../../api/useAnalytics'
import ChartComponent, {ChartDataItem, resolveChartKindName} from '../../components/Analytics/Chart'
import NumericalIndicatorsComponent from '../../components/Analytics/NumericalIndicators'
import MainLayout from '../../components/MainLayout'
import styles from './styles.module.css'

const {RangePicker} = DatePicker

export enum Discreteness {
	Day,
	Week,
	Month,
	Year
}

export enum ChartKind {
	Revenue = 0,
	Cost = 1,
	Margin = 2,
	K1 = 3,
	K2 = 4,
	Calculation = 5,
	Contract = 6,
	Assembly = 7,
	Installation = 8,
	Payment = 9,
	Profit = 10
}


const renderDatePicker = (discretenessKind: Discreteness, startDate: Dayjs, endDate: Dayjs, onRangeChange: (dates: null | (Dayjs | null)[], dateStrings: string[]) => void) => {
	return (
		<>
			{discretenessKind === Discreteness.Day &&
                <RangePicker allowClear={true} onChange={onRangeChange} value={[startDate, endDate]}/>}
			{discretenessKind === Discreteness.Week &&
                <RangePicker allowClear={true} onChange={onRangeChange} value={[startDate, endDate]} picker="week"/>}
			{discretenessKind === Discreteness.Month &&
                <RangePicker allowClear={true} onChange={onRangeChange} value={[startDate, endDate]} picker="month"/>}
			{discretenessKind === Discreteness.Year &&
                <RangePicker allowClear={true} onChange={onRangeChange} value={[startDate, endDate]} picker="year"/>}
		</>
	)
}

export default function AnalyticsPage() {
	const [dateOfStart, setDateOfStart] = useState<Dayjs | undefined>(dayjs()) //useRef<Dayjs>(dayjs().add(-1, 'month'))
	const [endDate, setDateEnd] = useState<Dayjs | undefined>(dayjs().add(1, 'day'))//useRef<Dayjs>(dayjs().add(1, 'month'))
	const [discretenessKind, setDiscretenessKind] = useState<Discreteness>(Discreteness.Day)
	const [chartKind, setChartKind] = useState<ChartKind>(ChartKind.Revenue)

	const [numericalIndicatorsState, setNumericalIndicatorsState] = useState<NumericalIndicators | undefined>(undefined)
	const [chartDataItemsState, setChartDataItemsState] = useState<ChartDataItem[]>([])

	const analyzeOnClickHandler = async () => {
		const periodParams: PeriodParams = createPeriodParams()
		const numericalIndicators: NumericalIndicators = mapNumericalIndicatorsDto(await getNumericalIndicators({
			period: periodParams,
			chartPeriodType: mapToChartPeriodType(discretenessKind),
		}))

		const chartDto: ChartDto = createChartDto()
		if (discretenessKind == Discreteness.Week) {
			const data: ChartItemWeeks[] = (await getChartAnalyticsPerPeriods(chartDto)).map(mapChartItemWeeksDto)
			setChartDataItemsState(data.map(mapChartItemWeeksToChartDataItem))
		} else {
			const data: ChartItem[] = (await getChartAnalyticsPerDates(chartDto)).map(mapChartItemDto)
			setChartDataItemsState(data.map(mapChartItemToChartDataItem))
		}

		setNumericalIndicatorsState(numericalIndicators)
	}

	const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
		if (dates) {
			setDateOfStart(dates[0]!)
			setDateEnd(dates[1]!)
		} else {
			setDateOfStart(dayjs())
			setDateEnd(dayjs())
		}
	}

	const onChangeRadio = (e: RadioChangeEvent) => {
		setDiscretenessKind(e.target.value)
	}

	const onChartKindChange = (value: ChartKind) => {
		setChartKind(value)
	}

	useEffect(() => {
		// setNumericalIndicatorsState(undefined)
		// setChartDataItemsState([])
		analyzeOnClickHandler()
	}, [discretenessKind, chartKind])

	const createPeriodParams = (): PeriodParams => {
		return {
			startDate: dateOfStart!.toISOString()!,
			endDate: endDate!.toISOString()!,
		}
	}

	const createChartDto = (): ChartDto => ({
		period: createPeriodParams(),
		chartPeriodType: mapToChartPeriodType(discretenessKind),
		chartType: mapToChartType(chartKind),
	})

	const mapToChartPeriodType = (discretenessValue: Discreteness): ChartPeriodType => {
		switch (discretenessValue) {
			case Discreteness.Day:
				return ChartPeriodType.NUMBER_0
			case Discreteness.Week:
				return ChartPeriodType.NUMBER_1
			case Discreteness.Month:
				return ChartPeriodType.NUMBER_2
			case Discreteness.Year:
				return ChartPeriodType.NUMBER_3
		}
	}

	const mapToChartType = (chartTypeValue: ChartKind): ChartType => {
		switch (chartTypeValue) {
			case ChartKind.Revenue:
				return ChartType.NUMBER_0
			case ChartKind.Cost:
				return ChartType.NUMBER_1
			case ChartKind.Margin:
				return ChartType.NUMBER_2
			case ChartKind.K1:
				return ChartType.NUMBER_3
			case ChartKind.K2:
				return ChartType.NUMBER_4
			case ChartKind.Calculation:
				return ChartType.NUMBER_5
			case ChartKind.Contract:
				return ChartType.NUMBER_6
			case ChartKind.Assembly:
				return ChartType.NUMBER_7
			case ChartKind.Installation:
				return ChartType.NUMBER_8
			case ChartKind.Payment:
				return ChartType.NUMBER_9
			case ChartKind.Profit:
				return ChartType.NUMBER_10
		}
	}

	const mapChartItemToChartDataItem = (item: ChartItem): ChartDataItem => {
		const value = parseFloat(item.value.toFixed(2))
		const name = mapChartItemDateToName(item.date)

		return {name, value}
	}

	const mapChartItemWeeksToChartDataItem = (item: ChartItemWeeks): ChartDataItem => {
		const value = parseFloat(item.value.toFixed(2))
		const name = mapChartItemPeriodToName(item.period)

		return {name, value}
	}

	const mapChartItemDateToName = (date: Dayjs): string => {
		if (discretenessKind == Discreteness.Day) {
			return date.format('DD.MM.YYYY')
		} else if (discretenessKind == Discreteness.Month) {
			return `${date.format('MMM')} ${date.get('year')}`
		} else if (discretenessKind == Discreteness.Year) {
			return `${date.get('year')}`
		} else {
			return date.format('DD.MM.YYYY')
		}
	}

	const mapChartItemPeriodToName = (period: PeriodItem): string => {
		const startYear: number = dateOfStart!.get('year')
		const endYear: number = endDate!.get('year')
		const isNeedApplyYearTag: boolean = (endYear - startYear) > 0

		let name = `${period.startDate?.format('DD')}.${period.startDate?.format('MM')}-${period.endDate?.format('DD')}.${period.endDate?.format('MM')}`

		if (isNeedApplyYearTag) {
			name += ` (${period.startDate?.get('year')})`
		}

		return name
	}

	const canAnalyze = (): boolean => {
		return !dateOfStart && !endDate
	}

	return (
		<MainLayout>
			<div className={styles.form}>
				<div className={styles.panelWrapper}>
					<div className={styles.panelControlsWrapper}>
						<div>
							<div
								className={styles.dateWrapperDatePicker}>{renderDatePicker(discretenessKind, dateOfStart!, endDate!, onRangeChange)}</div>
							<div>
								<Radio.Group onChange={onChangeRadio} value={discretenessKind}>
									<Radio value={Discreteness.Day}>Д</Radio>
									<Radio value={Discreteness.Week}>Н</Radio>
									<Radio value={Discreteness.Month}>М</Radio>
									<Radio value={Discreteness.Year}>Г</Radio>
								</Radio.Group>
							</div>
						</div>
						<div className={styles.chartTypeWrapper}>
							<span className={styles.chartTypeTitle}>Тип аналитики:</span>
							<Select
								defaultValue={ChartKind.Revenue}
								style={{width: 200}}
								onChange={onChartKindChange}
								options={[
									{value: ChartKind.Revenue, label: resolveChartKindName(ChartKind.Revenue)},
									{value: ChartKind.Cost, label: resolveChartKindName(ChartKind.Cost)},
									{value: ChartKind.Margin, label: resolveChartKindName(ChartKind.Margin)},
									{value: ChartKind.K1, label: resolveChartKindName(ChartKind.K1)},
									{value: ChartKind.K2, label: resolveChartKindName(ChartKind.K2)},
									{value: ChartKind.Calculation, label: resolveChartKindName(ChartKind.Calculation)},
									{value: ChartKind.Contract, label: resolveChartKindName(ChartKind.Contract)},
									{value: ChartKind.Assembly, label: resolveChartKindName(ChartKind.Assembly)},
									{value: ChartKind.Installation, label: resolveChartKindName(ChartKind.Installation)},
									{value: ChartKind.Payment, label: resolveChartKindName(ChartKind.Payment)},
									{value: ChartKind.Profit, label: resolveChartKindName(ChartKind.Profit)},
								]}
							/>
						</div>
					</div>
					<div>
						<Button
							type="primary"
							disabled={canAnalyze()}
							onClick={() => analyzeOnClickHandler()}
						>
							Анализировать
						</Button>
					</div>
				</div>
			</div>
			<NumericalIndicatorsComponent
				averageCheck={numericalIndicatorsState?.averageCheck}
				averageProductionDays={numericalIndicatorsState?.averageProductionDays}
				numberOfProducts={numericalIndicatorsState?.numberOfProducts}
			/>
			<ChartComponent
				data={chartDataItemsState}
				chartKind={chartKind}
				startDate={dateOfStart!}
				endDate={endDate!}
			/>
		</MainLayout>
	)
}