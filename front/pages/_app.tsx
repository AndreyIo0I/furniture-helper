import * as React from 'react'
import Head from 'next/head'
import {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {CacheProvider, EmotionCache} from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {ConfigProvider} from 'antd'
import ruRU from 'antd/locale/ru_RU'
import 'dayjs/locale/ru'
import {SWRConfig} from 'swr'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props
	return (
		<SWRConfig
			value={{
				errorRetryInterval: 1200000,
			}}
		>
			<CacheProvider value={emotionCache}>
				<Head>
					<title key="title">FurHelper</title>
					<meta name="viewport" content="initial-scale=1, width=device-width"/>
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline/>
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
						<ConfigProvider locale={ruRU}>
							<Component {...pageProps} />
						</ConfigProvider>
					</LocalizationProvider>
				</ThemeProvider>
			</CacheProvider>
		</SWRConfig>
	)
}
