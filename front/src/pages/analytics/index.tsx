import {Search} from '@mui/icons-material'
import {Button, InputAdornment, MenuItem, Stack, TextField} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import {styled} from '@mui/material/styles'
import {DatePicker} from '@mui/x-date-pickers'
import dayjs, {Dayjs} from 'dayjs'
import {useEffect, useRef, useState} from 'react'
import {
	mapOutdatedProjectsDto,
	mapProjectsMarginDto,
	mapProjectsPricesDto,
	mapSpendingOnCostsDto,
	OutdatedProjects,
	PeriodParams,
	ProjectsMargin,
	ProjectsPrices,
	SearchAnalyticParams,
	SpendingOnCosts,
	getOutdatedProjects,
	getProjectMargin,
	getProjectsPrices,
	getSpendingOnCosts,
} from '../../../api/useAnalytics'
import MarginComponent from '../../components/Analytics/Margin'
import {OutDatedProjectsComponent} from '../../components/Analytics/OutDatedProjects'
import {ProjectsPricesComponent} from '../../components/Analytics/ProjectsPrices'
import SpendingOnCostsComponent from '../../components/Analytics/SpendingOnCosts'
import MainNav from '../../components/MainNav'
import styles from './styles.module.css'


enum AnalyticsKind {
	Margin = 'margin',
	ProjectsPrices = 'projectsPrices',
	SpendingOnCosts = 'spendingOnCosts',
	OutDatedProjects = 'outDatedProjects',
}

const DatePickerContainer = styled('div')(() => ({
	flex: '160px 0 0',
}))


export default function AnalyticsPage() {
	const dateOfStart = useRef<HTMLInputElement>(null)
	const endDate = useRef<HTMLInputElement>(null)
	const searchText = useRef<HTMLInputElement>(null)
	const analyticsKind = useRef<HTMLInputElement>(null)

	const [analyticsKindState, setAnalyticsKindState] = useState<AnalyticsKind | null>(AnalyticsKind.ProjectsPrices)
	const [dateOfStartState, setDateOfStartState] = useState<Dayjs | null>(dayjs())
	const [endDateState, setEndDateState] = useState<Dayjs | null>(dayjs())

	const [analyticsState, setAnalyticsState] = useState<ProjectsPrices | OutdatedProjects | SpendingOnCosts | ProjectsMargin | undefined>(undefined)

	const analyzeOnClickHandler = async () => {
		switch (analyticsKindState) {
			case AnalyticsKind.ProjectsPrices: {
				const periodParams: PeriodParams = createPeriodParams()
				const projectPrices: ProjectsPrices = mapProjectsPricesDto((await getProjectsPrices(periodParams)))
				setAnalyticsState(projectPrices)
				break
			}
			case AnalyticsKind.SpendingOnCosts: {
				const searchAnalyticParams: SearchAnalyticParams = createSearchAnalyticParams()
				const spendingOnCosts: SpendingOnCosts = mapSpendingOnCostsDto((await getSpendingOnCosts(searchAnalyticParams)))
				setAnalyticsState(spendingOnCosts)
				break
			}
			case AnalyticsKind.OutDatedProjects: {
				const searchAnalyticParams: SearchAnalyticParams = createSearchAnalyticParams()
				const outDatedProjects: OutdatedProjects = mapOutdatedProjectsDto((await getOutdatedProjects(searchAnalyticParams)))
				setAnalyticsState(outDatedProjects)
				break
			}
			case AnalyticsKind.Margin: {
				const searchAnalyticParams: SearchAnalyticParams = createSearchAnalyticParams()
				const projectsMargin: ProjectsMargin = mapProjectsMarginDto((await getProjectMargin(searchAnalyticParams)))
				setAnalyticsState(projectsMargin)
				break
			}
		}
	}

	const createPeriodParams = (): PeriodParams => {
		return {
			startDate: dateOfStartState?.toISOString()!,
			endDate: endDateState?.toISOString()!,
		}
	}

	const createSearchAnalyticParams = (): SearchAnalyticParams => {
		return {
			name: searchText.current?.value!,
			period: createPeriodParams(),
		}
	}

	useEffect(() => {
	}, [analyticsState])

	return (
		<>
			<MainNav/>
			<div className={styles.form}>
				<div className={styles.panelWrapper}>
					<div>
						<Stack spacing={2} sx={{width: 300}}>
							<TextField
								margin="none"
								size="small"
								autoFocus
								inputRef={searchText}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Search/>
										</InputAdornment>
									),
								}}
							/>
						</Stack>
					</div>
					<div className={styles.panelControlsWrapper}>
						<FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
							<InputLabel id="demo-simple-select-standard-label">Тип аналитики</InputLabel>
							<Select
								labelId="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								label="Age"
								onChange={(e) => {
									setAnalyticsKindState(e.target.value as AnalyticsKind)
								}}
								defaultValue={AnalyticsKind.ProjectsPrices}
							>
								<MenuItem value={AnalyticsKind.Margin}>Маржа по проектам за период</MenuItem>
								<MenuItem value={AnalyticsKind.ProjectsPrices}>Цены проектов</MenuItem>
								<MenuItem value={AnalyticsKind.SpendingOnCosts}>Траты на издержки</MenuItem>
								<MenuItem value={AnalyticsKind.OutDatedProjects}>Просроченные проекты</MenuItem>
							</Select>
						</FormControl>
						<DatePickerContainer>
							<DatePicker
								value={dateOfStartState}
								inputRef={dateOfStart}
								onChange={(newValue) => {
									setDateOfStartState(newValue)
								}}
								renderInput={params => <TextField {...params} />}
							/>
						</DatePickerContainer>
						<DatePickerContainer>
							<DatePicker
								value={endDateState}
								inputRef={endDate}
								onChange={(newValue) => {
									setEndDateState(newValue)
								}}
								renderInput={params => <TextField {...params} />}
							/>
						</DatePickerContainer>
					</div>
					<div>
						<Button
							variant="contained"
							onClick={() => analyzeOnClickHandler()}
						>
							Анализировать
						</Button>
					</div>
				</div>
			</div>
			{!analyticsState && <h2>Проанализируйте ваши проекты по разным критериям</h2>}
			{analyticsState && analyticsKindState === AnalyticsKind.Margin
				&& <MarginComponent
					projectMargins={(analyticsState as ProjectsMargin).projectMargins!}
					totalMargin={(analyticsState as ProjectsMargin).totalMargin!}
					period={(analyticsState as ProjectsMargin).period!}
				/>}
			{analyticsState && analyticsKindState === AnalyticsKind.ProjectsPrices
				&& <ProjectsPricesComponent
					averagePrice={(analyticsState as ProjectsPrices).averagePrice!}
					projectPrices={(analyticsState as ProjectsPrices).projectPrices!}
					maxProjectPrice={(analyticsState as ProjectsPrices).maxProjectPrice!}
					minProjectPrice={(analyticsState as ProjectsPrices).minProjectPrice!}
				/>}
			{analyticsState && analyticsKindState === AnalyticsKind.OutDatedProjects
				&& <OutDatedProjectsComponent
					outdatedProjects={(analyticsState as OutdatedProjects).outdatedProjects!}
					averageAmount={(analyticsState as OutdatedProjects).averageAmount!}
					period={(analyticsState as OutdatedProjects).period!}
				/>}
			{analyticsState && analyticsKindState === AnalyticsKind.SpendingOnCosts
				&& <SpendingOnCostsComponent
					spendingOnCosts={(analyticsState as SpendingOnCosts).spendingOnCosts!}
				/>}
		</>
	)
}