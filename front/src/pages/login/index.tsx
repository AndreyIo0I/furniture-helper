import * as React from 'react'
import {useRouter} from 'next/router'
import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from '@mui/material'
import {LockOutlined} from '@mui/icons-material'
import login from '../../../api/useLogin'
import { useRef } from 'react'

export default function LoginPage() {
	const router = useRouter()
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		await login( emailRef.current!.value, passwordRef.current!.value )

		return router.push('/')
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{m: 1, bgcolor: '#19857b'}}>
					<LockOutlined/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Вход
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						autoFocus
						inputRef={emailRef}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Пароль"
						type="password"
						id="password"
						inputRef={passwordRef}
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Войти
					</Button>
				</Box>
			</Box>
		</Container>
	)
}