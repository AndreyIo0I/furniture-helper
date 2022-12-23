import {yupResolver} from '@hookform/resolvers/yup'
import {Box, Button, Container, TextField} from '@mui/material'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import MainNav from '../MainNav'
import styles from './styles.module.css'

type Form = {
	fullName: string;
	role: string;
	email: string;
}

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Поле не должно быть пустым'),
	email: Yup
		.string()
		.required('Поле не должно быть пустым')
		.email('Некорректный email'),
	role: Yup.string().required('Поле не должно быть пустым'),
})

export default function ClientPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitSuccessful},
	} = useForm<Form>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema),
	})

	const handleOnSubmit = (data: Object) => {
		alert('Form submit success: ' + JSON.stringify(data))
	}

	useEffect(() => {
		reset(formValues => ({
			...formValues,
		}))
	}, [isSubmitSuccessful, reset])

	return (
		<>
			<MainNav/>
			<Container maxWidth="lg">
				<Box
					component="form"
					onSubmit={handleSubmit(handleOnSubmit)}
					className={styles.form}
				>
					<TextField
						margin="normal"
						label="ФИО"
						defaultValue="Васнецов С.В."
						autoFocus
						{...register('fullName')}
						FormHelperTextProps={{error: !!errors.fullName?.message}}
						helperText={errors.fullName?.message}
					/>
					<TextField
						margin="normal"
						label="Почта"
						defaultValue="test@gmail.com"
						type="email"
						{...register('email')}
						FormHelperTextProps={{error: !!errors.email?.message}}
						helperText={errors.email?.message}
					/>
					<TextField
						margin="normal"
						label="Роль"
						defaultValue="Менеджер"
						type="role"
						{...register('role')}
						FormHelperTextProps={{error: !!errors.role?.message}}
						helperText={errors.role?.message}
					/>
					<div>
						<Button
							type="submit"
							variant="contained"
							style={{marginRight: '20px'}}
						>
							Сохранить
						</Button>
						<Button
							type="submit"
							variant="contained"
						>
							Удалить пользователя
						</Button>
					</div>
				</Box>
			</Container>
		</>
	)
}