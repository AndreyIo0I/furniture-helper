import {Dayjs} from 'dayjs'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {ChartKind} from '../../../pages/analytics'
import styles from './styles.module.css'

interface CharComponentProps {
	data: ChartDataItem[],
	chartKind: ChartKind,
	startDate: Dayjs,
	endDate: Dayjs
}

export interface ChartDataItem {
	name: string,
	value: number
}


function CustomizedAxisTick(props: any) {
	return (
		<g transform={`translate(${props.x},${props.y})`}>
			<text x={0} y={0} dy={0} textAnchor="start" fill="#666" transform="rotate(90)" fontSize={12}
				  fontWeight={600}>
				{props.payload.value}
			</text>
		</g>
	)
}

function resolveChartKindName(chartKind: ChartKind): string {
	switch (chartKind) {
		case ChartKind.Revenue:
			return 'Выручка'
		case ChartKind.Cost:
			return 'Себестоимость'
		case ChartKind.Margin:
			return 'Маржа'
		case ChartKind.K1:
			return 'K1'
		case ChartKind.K2:
			return 'K2'
		default:
			return 'Unknown'
	}
}

export default function ChartComponent(props: CharComponentProps) {
	if (!props.data || props.data.length == 0) {
		return <div className={styles.noDataWrapper}>
			<span className="">На период 
				<b className={styles.ml5}>{props.startDate.format('DD/MM/YYYY')}-{props.endDate.format('DD/MM/YYYY')}</b> не удалось найти данных для типа аналитики 
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<b className={styles.ml5}>"{resolveChartKindName(props.chartKind)}"</b>
			</span>
		</div>
	}

	return (
		<ResponsiveContainer width="100%" height="56%">
			<BarChart
				width={500}
				height={300}
				data={props.data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 10,
				}}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="name" height={60} allowDataOverflow={true} angle={90} interval={0}
					   tick={<CustomizedAxisTick/>}/>
				<YAxis/>
				<Tooltip/>
				<Bar dataKey="value" fill="#8884d8"/>
			</BarChart>
		</ResponsiveContainer>
	)
}