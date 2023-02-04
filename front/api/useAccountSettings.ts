import useSWR, {SWRResponse} from 'swr'
import {projectDeadlineApi} from './api'
import {ProjectDeadlineSettings} from './typescript-fetch-client-generated'
import useAuthenticatedSWR from './useAuthenticatedSWR'

export interface AccountSettings {
	daysForDeadlineYellow: number;
	daysForDeadlineRed: number;
	defaultProjectDurationDays: number;
}

export const mapAccountSettingsDto = (dto: ProjectDeadlineSettings): AccountSettings => ({
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