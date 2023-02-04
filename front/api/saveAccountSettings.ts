import {projectDeadlineApi} from './api'
import {ProjectDeadlineSettings} from './typescript-fetch-client-generated'
import {AccountSettings} from './useAccountSettings'
import {makeAuthenticatedReq} from './useAuthenticatedSWR'

const mapToSaveAccountSettings = (settings: AccountSettings): ProjectDeadlineSettings => ({
	daysForDeadlineYellow: settings.daysForDeadlineYellow,
	daysForDeadlineRed: settings.daysForDeadlineRed,
	defaultProjectDurationDays: settings.defaultProjectDurationDays,
})

export default function saveAccountSettings(settings: AccountSettings) {
	return makeAuthenticatedReq(
		async () => await projectDeadlineApi.projectDeadlineSettingsProjectDeadlineSettingsUpdatingPost(mapToSaveAccountSettings(settings))
	)
}