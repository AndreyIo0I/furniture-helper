import {LockOutlined} from '@mui/icons-material'
import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from '@mui/material'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useRef, useState} from 'react'
import login from '../../../api/login'
import {User} from '../../../api/users/createUser'

export default function LoginPage() {
	const router = useRouter()
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState(false)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const res = await login(emailRef.current!.value, passwordRef.current!.value)
		if (res.status === 401) {
			setError(true)
		} else if (res.status === 200) {
			res.json().then(async user => {
				window.localStorage.setItem('currentUserId', (user as User).id.toString())
				await router.push('/projects')
			})
		}
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
						error={error}
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
						error={error}
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