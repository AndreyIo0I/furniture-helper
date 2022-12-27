import React from 'react'
import SecondaryNav from '../SecondaryNav'

interface ProjectSecondaryNav {
	projectId: string,
}

export default function ProjectSecondaryNav(props: ProjectSecondaryNav) {
	return <SecondaryNav
		items={[{
			text: 'Общие',
			link: `/projects/${props.projectId}`,
		}, {
			text: 'Этапы',
			link: `/projects/${props.projectId}/stages`,
		}, {
			text: 'Исполнение бюджета',
			link: `/projects/${props.projectId}/budget`,
		}]}
	/>
}