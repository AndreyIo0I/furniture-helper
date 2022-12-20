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
import 'dayjs/locale/ru'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const {Component, emotionCache = clientSideEmotionCache, pageProps} = props
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title key="title">FurHelper</title>
				<meta name="viewport" content="initial-scale=1, width=device-width"/>
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline/>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
					<Component {...pageProps} />
				</LocalizationProvider>
			</ThemeProvider>
		</CacheProvider>
	)
}
