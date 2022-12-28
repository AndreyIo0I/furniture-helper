import React from 'react'
import SecondaryNav from '../SecondaryNav'

export default function SettingsSecondaryNav() {
	return <SecondaryNav
		items={[{
			text: 'Общие',
			link: '/settings',
		}, {
			text: 'Клиенты',
			link: '/settings/clients',
		}, {
			text: 'Типы издержек',
			link: '/settings/costs',
		}, {
			text: 'Пользователи',
			link: '/settings/users',
		}, {
			text: 'Мой профиль',
			link: '/settings/users/me',
		}]}
	/>
}