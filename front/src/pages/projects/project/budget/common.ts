import {blue} from '@ant-design/colors'
import {SxProps} from '@mui/material'
import {Dayjs} from 'dayjs'

export const pageContainerId = 'projectBudgetPageContainer'

export const formStyle: SxProps = {
	mt: 3,
	maxWidth: 'fit-content',
}

export const addRowStyle = {
	background: blue[0],
}

export function getPopupContainer() {
	return document.getElementById(pageContainerId)!
}

export function toApiModelDate(date: Dayjs | null): Date {
	if (date === null) {
		throw 'invalid date'
	}
	return date.toDate()
}

export function toApiModelNumber(value: number | null): number {
	if (value === null) {
		throw 'required field is missing'
	}
	return value
}

export function toViewStatus(hasError?: boolean): 'error' | undefined {
	return hasError ? 'error' : undefined
}
