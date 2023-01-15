import {yupResolver} from '@hookform/resolvers/yup'
import {Box, Container, TextField} from '@mui/material'
import {Button} from 'antd'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import createClient from '../../../../api/clients/createClient'
import styles from './styles.module.css'

type Form = {
	fullName: string;
	source: string;
	phone: string;
	email: string;
	description?: string;
}

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Поле не должно быть пустым'),
})

export default function NewClientPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitSuccessful},
	} = useForm<Form>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema),
	})

	const router = useRouter()
	const handleOnSubmit = async (data: Form) => {
		const newClientId = await createClient({
			name: data.fullName,
			communicationChannel: data.source,
			phoneNumber: data.phone,
			mail: data.email,
			description: data.description,
		})
		await router.push(`/settings/clients/${encodeURIComponent(newClientId)}`)
	}

	useEffect(() => {
		reset(formValues => ({
			...formValues,
		}))
	}, [isSubmitSuccessful, reset])

	return (
		<>
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
						label="Канал привлечения"
						{...register('source')}
						FormHelperTextProps={{error: !!errors.source?.message}}
						helperText={errors.source?.message}
					/>
					<TextField
						margin="normal"
						label="Телефон"
						{...register('phone')}
						FormHelperTextProps={{error: !!errors.phone?.message}}
						helperText={errors.phone?.message}
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
						label="Описание"
						multiline
						minRows={4}
						maxRows={16}
						{...register('description')}
						FormHelperTextProps={{error: !!errors.description?.message}}
						helperText={errors.description?.message}
					/>
					<div>
						<Button
							htmlType="submit"
							type="primary"
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