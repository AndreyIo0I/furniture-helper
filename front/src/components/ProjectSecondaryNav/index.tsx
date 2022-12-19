import React from 'react'
import SecondaryNav from '../SecondaryNav'

interface ProjectSecondaryNav {
	projectId: string,
}

export default function ProjectSecondaryNav(props: ProjectSecondaryNav) {
	return <SecondaryNav
		items={[{
			text: 'Общие',
			link: `/project/${props.projectId}`,
		}, {
			text: 'Этапы',
			link: '/project/stages',
		}, {
			text: 'Исполнение бюджета',
			link: '/project/budget',
		}]}
	/>
}