import {Box, Button, Container, MenuItem, Select, TextField} from '@mui/material'
import React, {useRef, useState} from 'react'
import {User, UserRole} from '../../../../../api/users/createUser'
import updateUser from '../../../../../api/users/updateUser'
import useUser from '../../../../../api/users/useUser'
import MainNav from '../../../../components/MainNav'
import styles from './styles.module.css'

interface UserPageContentProps {
	user: User
}

function Content({user}: UserPageContentProps) {
	const nameRef = useRef<HTMLInputElement>()
	const emailRef = useRef<HTMLInputElement>()
	const [role, setRole] = useState(UserRole.Manager)
	const passwordRef = useRef<HTMLInputElement>()

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await updateUser({
			name: nameRef.current!.value,
			email: emailRef.current!.value,
			role: role,
			password: passwordRef.current!.value,
		})
	}

	const onUserRemove = () => {
		alert()
	}

	return (
		<Box
			component="form"
			onSubmit={handleOnSubmit}
			className={styles.form}
		>
			<TextField
				inputRef={nameRef}
				defaultValue={user.name}
				margin="normal"
				label="ФИО"
				required
				autoFocus
			/>
			<TextField
				inputRef={emailRef}
				defaultValue={user.email}
				margin="normal"
				label="Почта"
				required
				type="email"
			/>
			<Select
				value={user.role}
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
			/>
			<div>
				<Button
					type="submit"
					variant="contained"
					style={{marginRight: '20px'}}
				>
					Сохранить изменения
				</Button>
				<Button
					type="submit"
					variant="contained"
					onClick={onUserRemove}
				>
					Удалить пользователя
				</Button>
			</div>
		</Box>
	)
}

interface UserPageProps {
	userId: number
}

export default function UserPage({userId}: UserPageProps) {
	const {data: user} = useUser(userId)

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				{user && <Content user={user}/>}
			</Container>
		</>
	)
}