import {Box, Button, Container, MenuItem, Select, TextField} from '@mui/material'
import React, {useRef, useState} from 'react'
import createUser, {UserRole} from '../../../../../api/users/createUser'
import styles from './styles.module.css'

export default function NewUserPage() {
	const nameRef = useRef<HTMLInputElement>()
	const emailRef = useRef<HTMLInputElement>()
	const [role, setRole] = useState(UserRole.Manager)
	const passwordRef = useRef<HTMLInputElement>()

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await createUser({
			name: nameRef.current!.value,
			email: emailRef.current!.value,
			role: role,
			password: passwordRef.current!.value,
		})
	}

	return (
		<>
			<Container maxWidth="lg">
				<Box
					component="form"
					onSubmit={handleOnSubmit}
					className={styles.form}
				>
					<TextField
						inputRef={nameRef}
						margin="normal"
						label="ФИО"
						required
						autoFocus
					/>
					<TextField
						inputRef={emailRef}
						margin="normal"
						label="Почта"
						required
						type="email"
					/>
					<Select
						value={role}
						label="Роль"
						onChange={e => {
							if (typeof e.target.value !== 'string') {
								setRole(e.target.value)
							}
						}}
					>
						<MenuItem value={UserRole.Admin}>Администратор</MenuItem>
						<MenuItem value={UserRole.Manager}>Менеджер</MenuItem>
					</Select>
					<TextField
						inputRef={passwordRef}
						margin="normal"
						label="Пароль"
						required
					/>
					<div>
						<Button
							type="submit"
							variant="contained"
							className={styles.button}
						>
							Создать
						</Button>
					</div>
				</Box>
			</Container>
		</>
	)
}
