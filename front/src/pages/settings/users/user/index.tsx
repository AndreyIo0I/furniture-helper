import {Box, Button, Container, MenuItem, Select, TextField} from '@mui/material'
import React, {useRef, useState} from 'react'
import {User, UserRole} from '../../../../../api/users/createUser'
import deleteUser from '../../../../../api/users/deleteUser'
import updateUser from '../../../../../api/users/updateUser'
import useCurrentUser from '../../../../../api/users/useCurrentUser'
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
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await updateUser({
			id: user.id,
			name: nameRef.current!.value,
			email: emailRef.current!.value,
			role: role,
			password: password || undefined,
		})
	}

	const onUserRemove = async () => {
		await deleteUser(user.id)
	}

	const confirmError = passwordConfirmation !== password
		? 'Пароли не совпадают'
		: null

	const {data: currentUser} = useCurrentUser()
	const isMe = currentUser && currentUser.id === user.id

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
			{user.role !== UserRole.Owner && (
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
			)}
			{isMe && (<>
				<TextField
					value={password}
					onChange={e => setPassword(e.target.value)}
					margin="normal"
					label="Новый пароль"
				/>
				<TextField
					value={passwordConfirmation}
					onChange={e => setPasswordConfirmation(e.target.value)}
					margin="normal"
					label="Подтверждение пароля"
					error={!!confirmError}
					helperText={confirmError}
				/>
			</>)}
			<div style={{marginTop: '24px'}}>
				<Button
					type="submit"
					variant="contained"
					style={{marginRight: '20px'}}
					disabled={!!confirmError}
				>
					Сохранить изменения
				</Button>
				{!isMe && <Button
					type="submit"
					variant="contained"
					onClick={onUserRemove}
				>
					Удалить пользователя
				</Button>}
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