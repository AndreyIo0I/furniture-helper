import TextField from '@mui/material/TextField/TextField'
import Button from '@mui/material/Button/Button'
import * as React from 'react'
import {useRouter} from 'next/router'
import Container from '@mui/material/Container/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import {Avatar, Typography} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export default function LoginPage() {
	const router = useRouter()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
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
				<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
					<LockOutlinedIcon/>
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
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Пароль"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	)
}