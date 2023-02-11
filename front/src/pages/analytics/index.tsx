import {Button, DatePicker, Radio, RadioChangeEvent} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import {useEffect, useRef, useState} from 'react'
import {
	getNumericalIndicators,
	mapNumericalIndicatorsDto,
	NumericalIndicators,
	PeriodParams,
} from '../../../api/useAnalytics'
import NumericalIndicatorsComponent from '../../components/Analytics/NumericalIndicators'
import MainLayout from '../../components/MainLayout'
import styles from './styles.module.css'

const {RangePicker} = DatePicker

enum Discreteness {
	Day,
	Week,
	Month,
	Year
}

const renderDatePicker = (discretenessKind: Discreteness, onRangeChange: (dates: null | (Dayjs | null)[], dateStrings: string[]) => void) => {
	return (
		<>
			{ discretenessKind === Discreteness.Day && <RangePicker onChange={onRangeChange} /> }
			{ discretenessKind === Discreteness.Week && <RangePicker onChange={onRangeChange} picker="week" /> }
			{ discretenessKind === Discreteness.Month && <RangePicker onChange={onRangeChange} picker="month" /> }
			{ discretenessKind === Discreteness.Year && <RangePicker onChange={onRangeChange} picker="year" /> }
		</>
	)
}

export default function AnalyticsPage() {
	const dateOfStart = useRef<Dayjs>(dayjs())
	const endDate = useRef<Dayjs>(dayjs())
	//const analyticsKind = useRef<Dayjs>(null)
	const [discretenessKind, setDiscretenessKind] = useState<Discreteness>(Discreteness.Day)

	const [numericalIndicatorsState, setNumericalIndicatorsState] = useState<NumericalIndicators | undefined>(undefined)

	const analyzeOnClickHandler = async () => {
		const periodParams: PeriodParams = createPeriodParams()
		const numericalIndicators: NumericalIndicators = mapNumericalIndicatorsDto( await getNumericalIndicators(periodParams) )

		setNumericalIndicatorsState(numericalIndicators);
	}

	const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
		if (dates) {
			dateOfStart.current = dayjs(dates[0])
			endDate.current = dayjs(dates[1])
		} else {
			dateOfStart.current = dayjs()
			endDate.current = dayjs()
		}
	};

	const onChangeRadio = (e: RadioChangeEvent) => {
    setDiscretenessKind(e.target.value)
  };

	useEffect(() => {}, [discretenessKind])

	const createPeriodParams = (): PeriodParams => {
		return {
			startDate: dateOfStart.current.toISOString()!,
			endDate: endDate.current.toISOString()!,
		}
	}

	return (
		<MainLayout>
			<div className={styles.form}>
				<div className={styles.panelWrapper}>
					<div className={styles.panelControlsWrapper}>
						<div>
							<div className={styles.dateWrapperDatePicker}>{renderDatePicker(discretenessKind, onRangeChange)}</div>
							<div>
								<Radio.Group onChange={onChangeRadio} value={discretenessKind}>
						      <Radio value={Discreteness.Day}>Д</Radio>
						      <Radio value={Discreteness.Week}>Н</Radio>
						      <Radio value={Discreteness.Month}>М</Radio>
						      <Radio value={Discreteness.Year}>Г</Radio>
    						</Radio.Group>
							</div>
						</div>
					</div>
					<div>
						<Button
							type="primary"
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
				numberOfProducts = {numericalIndicatorsState?.numberOfProducts}
			/>
		</MainLayout>
	)
}