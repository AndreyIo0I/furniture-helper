import {Layout, Menu, theme} from 'antd'
import {useRouter} from 'next/router'
import React, {ReactNode} from 'react'

const routes = [{
	label: 'Проекты',
	key: '/projects',
	items: [{
		label: 'Общее',
		key: '',
	}, {
		label: 'Этапы',
		key: '/stages',
	}, {
		label: 'Исполнение бюджета',
		key: '/budget',
	}, {
		label: 'Аналитика по проекту',
		key: '/analytics',
	}],
}, {
	label: 'Аналитика',
	key: '/analytics',
}, {
	label: 'Настройки',
	key: '/settings',
	items: [{
		label: 'Общее',
		key: '',
	}, {
		label: 'Клиенты',
		key: '/clients',
	}, {
		label: 'Типы издержек',
		key: '/costs',
	}, {
		label: 'Пользователи',
		key: '/users',
	}, {
		label: 'Мой профиль',
		key: '/clients/me',
	}],
}, {
	label: 'Общие издержки',
	key: '/costs',
}]

interface MainLayoutProps {
	children: ReactNode
	projectId?: number
}

export default function MainLayout({
	children,
	projectId,
}: MainLayoutProps) {
	const router = useRouter()
	const {
		token: {colorBgContainer},
	} = theme.useToken()

	const currentTopItem = routes.find(item => router.asPath.startsWith(item.key))!
	const sidebarItems = currentTopItem.key === '/projects' && projectId
		? currentTopItem.items!.map(item => ({
			...item,
			key: '/' + projectId + item.key,
		}))
		: currentTopItem.key !== '/projects' && currentTopItem.items

	return (
		<Layout style={{height: '100vh'}}>
			<Layout.Header className="header">
				<div style={{
					float: 'left',
					width: '120px',
					height: '31px',
					margin: '16px 24px 16px 0',
				}}/>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={[currentTopItem.key]}
					items={routes}
					onClick={item => router.push(item.key)}
				/>
			</Layout.Header>
			<Layout>
				<Layout.Sider width={200} style={{background: colorBgContainer}}>
					{!!sidebarItems && (
						<Menu
							mode="inline"
							defaultSelectedKeys={[sidebarItems.find(item => currentTopItem.key + item.key === router.asPath)!.key]}
							style={{height: '100%', borderRight: 0}}
							items={sidebarItems}
							onClick={item => router.push(currentTopItem.key + item.key)}
						/>
					)}
				</Layout.Sider>
				<Layout style={{padding: '24px'}}>
					<Layout.Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
						}}
					>
						{children}
					</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	)
}
