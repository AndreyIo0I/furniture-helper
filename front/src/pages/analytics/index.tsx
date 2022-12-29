import { Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MainNav from '../../components/MainNav'
import {DatePicker} from '@mui/x-date-pickers'
import {styled} from '@mui/material/styles'
import styles from './styles.module.css'
import dayjs, { Dayjs } from 'dayjs'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Search } from '@mui/icons-material'
import Margin from '../../components/Analytics/Margin'
import { ProjectsPrices } from '../../components/Analytics/ProjectsPrices'
import { OutDatedProjects } from '../../components/Analytics/OutDatedProjects'
import SpendingOnCosts from '../../components/Analytics/SpendingOnCosts'


enum AnalyticsKind {
    Margin = "margin",
    ProjectsPrices = "projectsPrices",
    SpendingOnCosts = "spendingOnCosts",
    OutDatedProjects = "outDatedProjects"
}

const DatePickerContainer = styled('div')(() => ({
	flex: '160px 0 0',
}))

interface AnalyticsPanelProps {
    dateOfStart: RefObject<HTMLInputElement>
    endDate: RefObject<HTMLInputElement>
    searchText: RefObject<HTMLInputElement>
    analyticsKind: RefObject<HTMLInputElement>
}

export default function AnalyticsPage() {
    const dateOfStart = useRef<HTMLInputElement>(null)
	const endDate = useRef<HTMLInputElement>(null)
    const searchText = useRef<HTMLInputElement>(null)
    const analyticsKind = useRef<HTMLInputElement>(null)

    const [analyticsKindState, setAnalyticsKindState] = useState<string|undefined>()
    const [dateOfStartState, setDateOfStartState] = useState<Dayjs | null>(dayjs())
    const [endDateState, setEndDateState] = useState<Dayjs | null>(dayjs())

    const analizeOnClickHandler = () => {
        console.log(dateOfStart.current?.value)
        console.log(endDate.current?.value)
        console.log(searchText.current?.value)
        console.log(analyticsKind.current?.value)

        setAnalyticsKindState(analyticsKind.current?.value)
    }

    useEffect( () => {}, [analyticsKindState, dateOfStart, endDate])

    return (
        <>
            <MainNav/>
            <div className={styles.form}>
                <div className={styles.panelWrapper}>
                    <div>
                        <Stack spacing={2} sx={{ width: 300 }}>
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
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Тип аналитики</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Age"
                                inputRef={analyticsKind}
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
                            onClick={(e) => analizeOnClickHandler()}
                        >
                            Анализировать
                        </Button>
                </div>
            </div> 
            </div>

            {analyticsKindState === AnalyticsKind.Margin 
                && <Margin text={"Аналитика по Margin"}/>}
            {analyticsKindState === AnalyticsKind.ProjectsPrices
                && <ProjectsPrices 
                        dateOfStart={dateOfStart.current?.value|| ""}
                        endDate={endDate.current?.value || ""}
                    />}
            {analyticsKindState === AnalyticsKind.OutDatedProjects
                && <OutDatedProjects text={"Аналитика по OutDatedProjects"}/>}
            {analyticsKindState === AnalyticsKind.SpendingOnCosts
                && <SpendingOnCosts text={"Аналитика по SpendingOnCosts"}/>}
        </>
    )
}