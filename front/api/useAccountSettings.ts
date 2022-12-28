import useSWR, {SWRResponse} from 'swr'
import {clientApi, projectDeadlineApi} from './api'
import {ClientDto, ProjectDeadlineSettings} from './typescript-fetch-client-generated'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface AccountSettings {
	id: number;
	daysForDeadlineYellow: number;
	daysForDeadlineRed: number;
	defaultProjectDurationDays: number;
}

export const mapAccountSettingsDto = (dto: ProjectDeadlineSettings): AccountSettings => ({
	id: dto.id!,
	daysForDeadlineYellow: dto.daysForDeadlineYellow!,
	daysForDeadlineRed: dto.daysForDeadlineRed!,
	defaultProjectDurationDays: dto.defaultProjectDurationDays!,
})

export default function useAccountSettings(): SWRResponse<AccountSettings> {
	return useAuthenticatedSWR(
		useSWR(
			'useAccountSettings',
			async () => mapAccountSettingsDto(await projectDeadlineApi.projectDeadlineSettingsGet()),
		),
	)
}