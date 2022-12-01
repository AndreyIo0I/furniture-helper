import * as React from 'react'
import MainNav from '../MainNav'
import {useRouter} from 'next/router'
import {Box, Button, TextField} from '@mui/material'
import styles from './styles.module.css'

export default function NewProjectPage() {
	const router = useRouter()

	const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		alert('Проект считай что создан =)')
		const newProjectId = '1'
		await router.push(`/project/${encodeURIComponent(newProjectId)}`)
	}

	return (
		<>
			<MainNav/>
			<Box
				component="form"
				onSubmit={createNewProject}
				className={styles.form}
			>
				<TextField
					margin="normal"
					required
					label="Название проекта"
					autoFocus
				/>
				<TextField
					label="Описание"
					multiline
					minRows={4}
					maxRows={16}
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
		</>
	)
}