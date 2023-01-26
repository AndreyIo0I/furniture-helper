import {SxProps} from '@mui/material'

export const pageContainerId = 'projectBudgetPageContainer'

export const formStyle: SxProps = {
	mt: 3,
	maxWidth: 'fit-content',
}

export function getPopupContainer() {
	return document.getElementById(pageContainerId)!
}

export function isValidDate(date: Date | null): boolean {
	return date !== null
}

export function toApiModelDate(date: Date | null): Date {
	if (!isValidDate(date)) {
		throw 'invalid date'
	}
	return date!
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
