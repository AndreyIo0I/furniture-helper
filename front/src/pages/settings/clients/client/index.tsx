import {yupResolver} from '@hookform/resolvers/yup'
import {Box, Button, Container, TextField} from '@mui/material'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import deleteClient from '../../../../../api/clients/deleteClient'
import updateClient from '../../../../../api/clients/updateClient'
import useClient from '../../../../../api/clients/useClient'
import {Client} from '../../../../../api/clients/useClients'
import {UserRole} from '../../../../../api/users/createUser'
import useCurrentUser from '../../../../../api/users/useCurrentUser'
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

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Поле не должно быть пустым'),
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
			name: data.fullName,
			communicationChannel: data.source,
			phoneNumber: data.phone,
			mail: data.email,
			description: data.description || '',
		})
	}

	useEffect(() => {
		reset(formValues => ({
			...formValues,
		}))
	}, [isSubmitSuccessful, reset])

	const router = useRouter()

	const {data: currentUser} = useCurrentUser()

	const isEditable = currentUser && currentUser.role !== UserRole.Manager

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
						disabled={!isEditable}
					/>
					<TextField
						margin="normal"
						label={client.source}
						defaultValue="Реклама в вк"
						{...register('source')}
						FormHelperTextProps={{error: !!errors.source?.message}}
						helperText={errors.source?.message}
						disabled={!isEditable}
					/>
					<TextField
						margin="normal"
						label="Телефон"
						defaultValue={client.phone}
						{...register('phone')}
						FormHelperTextProps={{error: !!errors.phone?.message}}
						helperText={errors.phone?.message}
						disabled={!isEditable}
					/>
					<TextField
						margin="normal"
						label="Почта"
						defaultValue={client.email}
						type="email"
						{...register('email')}
						FormHelperTextProps={{error: !!errors.email?.message}}
						helperText={errors.email?.message}
						disabled={!isEditable}
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
						disabled={!isEditable}
					/>
					<div
						style={{
							display: 'flex',
							gap: '16px',
						}}
					>
						<Button
							type="submit"
							variant="contained"
						>
							Сохранить
						</Button>
						{isEditable && (
							<Button
								onClick={async () => {
									await deleteClient(client.id)
									await router.push('/settings/clients')
								}}
							>
								Удалить
							</Button>
						)}
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