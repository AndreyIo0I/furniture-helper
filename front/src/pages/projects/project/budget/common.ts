import {SxProps} from '@mui/material'
import {Dayjs} from 'dayjs'

export const pageContainerId = 'projectBudgetPageContainer'

export const formStyle: SxProps = {
	mt: 3,
	maxWidth: 'fit-content',
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

export function toApiModelNumber(value?: number): number {
	if (value === undefined) {
		throw 'required field is missing'
	}
	return value
}

export function toViewModelNumber(value: string): number | undefined {
	return value !== '' ? Number(value) : undefined
}

export function toViewNumber(value?: number): number | '' {
	return value !== undefined ? value : ''
}

export function toViewStatus(hasError?: boolean): 'error' | undefined {
	return hasError ? 'error' : undefined
}
