import {yupResolver} from '@hookform/resolvers/yup'
import {Box, Button, Container, TextField} from '@mui/material'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import updateClient from '../../../../../api/clients/updateClient'
import useClient from '../../../../../api/clients/useClient'
import {Client} from '../../../../../api/clients/useClients'
import MainNav from '../../../../components/MainNav'
import SettingsSecondaryNav from '../../../../components/SettingsSecondaryNav'
import styles from './styles.module.css'

type Form = {
	fullName: string;
	source: string;
	phone: string;
	email: string;
	description?: string;
}

const phoneRegExp = /^[\d()\-+\s]+$/

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Поле не должно быть пустым'),
	source: Yup.string().required('Поле не должно быть пустым'),
	phone: Yup
		.string()
		.matches(phoneRegExp, 'Некорректный номер телефона'),
	email: Yup
		.string()
		.required('Поле не должно быть пустым')
		.email('Некорректный email'),
	description: Yup.string().nullable(true),
})

function Content({client}: { client: Client }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitSuccessful},
	} = useForm<Form>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema),
	})

	const handleOnSubmit = async (data: Form) => {
		await updateClient({
			id: client.id,
			fullName: data.fullName,
			source: data.source,
			phone: data.phone,
			email: data.email,
			description: data.description || '',
		})
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
						defaultValue={client.fullName}
						autoFocus
						{...register('fullName')}
						FormHelperTextProps={{error: !!errors.fullName?.message}}
						helperText={errors.fullName?.message}
					/>
					<TextField
						margin="normal"
						label={client.source}
						defaultValue="Реклама в вк"
						{...register('source')}
						FormHelperTextProps={{error: !!errors.source?.message}}
						helperText={errors.source?.message}
					/>
					<TextField
						margin="normal"
						label="Телефон"
						defaultValue={client.phone}
						{...register('phone')}
						FormHelperTextProps={{error: !!errors.phone?.message}}
						helperText={errors.phone?.message}
					/>
					<TextField
						margin="normal"
						label="Почта"
						defaultValue={client.email}
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
						defaultValue={client.description}
						{...register('description')}
						FormHelperTextProps={{error: !!errors.description?.message}}
						helperText={errors.description?.message}
					/>
					<div>
						<Button
							type="submit"
							variant="contained"
						>
							Сохранить
						</Button>
					</div>
				</Box>
			</Container>
		</>
	)
}

interface ClientPageProps {
	clientId: number
}

export default function ClientPage({clientId}: ClientPageProps) {
	const {data: client} = useClient(clientId)

	if (!client)
		return null

	return <Content client={client}/>
}