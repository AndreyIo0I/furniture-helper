import {yupResolver} from '@hookform/resolvers/yup'
import {Box, Button, Container, TextField} from '@mui/material'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import MainNav from '../MainNav'
import SettingsSecondaryNav from '../SettingsSecondaryNav'
import styles from './styles.module.css'

type Form = {
	fullName: string;
	email: string;
    password: string;
    newPassword: string;
}

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Поле не должно быть пустым'),
	email: Yup
		.string()
		.required('Поле не должно быть пустым')
		.email('Некорректный email'),
	password: Yup.string().required('Поле не должно быть пустым'),
	newPassword: Yup
		.string()  
		.required('Поле не должно быть пустым'),
})

export default function NewUserPage() {
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
			<SettingsSecondaryNav/>
			<Container maxWidth="lg">
				<Box
					component="form"
					onSubmit={handleSubmit(handleOnSubmit)}
					className={styles.form}
				>
					<TextField
						margin="normal"
						label="ФИО"
						autoFocus
						{...register('fullName')}
						FormHelperTextProps={{error: !!errors.fullName?.message}}
						helperText={errors.fullName?.message}
					/>
					<TextField
						margin="normal"
						label="Почта"
						type="email"
						{...register('email')}
						FormHelperTextProps={{error: !!errors.email?.message}}
						helperText={errors.email?.message}
					/>
					<TextField
						id='newPas'
						margin="normal"
						label="Новый пароль"
						type="password"
						{...register('password')}
						FormHelperTextProps={{error: !!errors.password?.message}}
						helperText={errors.password?.message}
					/>
					<TextField
						id='confirmPas'
						margin="normal"
						label="Подтверждение пароля"
						type="password"
						{...register('newPassword')}
						FormHelperTextProps={{error: !!errors.newPassword?.message}}
						helperText={errors.newPassword?.message}
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