import {ArrowLeftOutlined} from '@ant-design/icons'
import {Layout, Menu, theme, Button} from 'antd'
import {useRouter} from 'next/router'
import React, {ReactNode} from 'react'

type Route = {
	label: string
	key: string
	regexp: RegExp
	items?: Route[]
}

const routes: Route[] = [{
	label: 'Проекты',
	key: '/projects',
	regexp: /^\/projects(?:\/.*)?$/,
	items: [{
		label: 'Общее',
		key: '',
		regexp: /^\/projects\/[^\/]*$/,
	}, {
		label: 'Этапы',
		key: '/stages',
		regexp: /^\/projects\/.*\/stages$/,
	}, {
		label: 'Исполнение бюджета',
		key: '/budget',
		regexp: /^\/projects\/.*\/budget$/,
	}, {
		label: 'Аналитика по проекту',
		key: '/analytics',
		regexp: /^\/projects\/.*\/analytics$/,
	}],
}, {
	label: 'Клиенты',
	key: '/clients',
	regexp: /^\/clients(?:\/.*)?$/,
}, {
	label: 'Аналитика',
	key: '/analytics',
	regexp: /^\/analytics$/,
}, {
	label: 'Настройки',
	key: '/settings',
	regexp: /^\/settings(?:\/.*)?$/,
	items: [{
		label: 'Общие',
		key: '',
		regexp: /^\/settings$/,
	}, {
		label: 'Типы издержек',
		key: '/costs',
		regexp: /^\/settings\/costs$/,
	}, {
		label: 'Пользователи',
		key: '/users',
		regexp: /^\/settings\/users(?:\/(?!me).*)?$/,
	}, {
		label: 'Мой профиль',
		key: '/users/me',
		regexp: /^\/settings\/users\/me$/,
	}],
}, {
	label: 'Общие издержки',
	regexp: /^\/costs$/,
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

	const currentTopItem = routes.find(item => item.regexp.test(router.asPath))!
	const sidebarItems = currentTopItem.key === '/projects' && projectId
		? currentTopItem.items!.map(item => ({
			...item,
			key: '/' + projectId + item.key,
		}))
		: currentTopItem.key !== '/projects' && currentTopItem.items

	const onLogout = async () => {
		await fetch('/api/logout', {method: 'POST'})
		await router.push('/login')
	}

	return (
		<Layout style={{height: '100vh'}}>
			<Layout.Header className="header">
				<Button
					style={{
						float: 'left',
						width: '120px',
						height: '31px',
						margin: '16px 24px 16px 0',
					}}
					onClick={() => router.back()}
					type="link"
				>
					<ArrowLeftOutlined/>
				</Button>
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
							defaultSelectedKeys={[sidebarItems.find(item => item.regexp.test(router.asPath))!.key]}
							style={{height: '100%', borderRight: 0}}
							items={sidebarItems}
							onClick={item => router.push(currentTopItem.key + item.key)}
						/>
					)}
					<Button
						onClick={onLogout}
						type="link"
						danger
						style={{
							position: 'absolute',
							left: '50%',
							bottom: '24px',
							transform: 'translateX(-50%)',
						}}
					>
						Выход
					</Button>
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
