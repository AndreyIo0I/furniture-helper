import {Box, Button, TextField} from '@mui/material'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import MainNav from '../MainNav'
import * as Yup from 'yup'
import styles from './styles.module.css'

type Form = {
	projectDurationDays: number;
	beforeDeadlineYellowColorDays: number;
	beforeDeadlineRedColorDays: number;
}

const defaultSettings = {
	projectDurationDays: 42,
	beforeDeadlineYellowColorDays: 20,
	beforeDeadlineRedColorDays: 10,
}

const basedMainSettingsNumberSchema = Yup.number()
	.transform(value => (isNaN(value) ? undefined : value))
	.required('*Поле не может быть пустым')
	.min(1, 'Значение не может быть меньше 1')

const validationSchema = Yup.object().shape({
	projectDurationDays: basedMainSettingsNumberSchema,
	beforeDeadlineYellowColorDays: basedMainSettingsNumberSchema
		.test(
			'yellow-more-than-red',
			'*Кол-во дней не может быть меньше или равно кол-ву дней для красного цвета',
			(value, ctx) => {
				if (!value) return true
				return value > ctx.parent.beforeDeadlineRedColorDays
			},
		),
	beforeDeadlineRedColorDays: basedMainSettingsNumberSchema
		.test(
			'red-less-than-yellow',
			'*Кол-во дней не может быть больше или равно кол-ву дней для желтого цвета',
			(value, ctx) => {
				if (!value) return true
				return value < ctx.parent.beforeDeadlineYellowColorDays
			},
		),
})

export default function MainSettingsPage() {
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
			<Box
				component="form"
				className={styles.form}
				onSubmit={handleSubmit(handleOnSubmit)}
			>
				<div>
					<div>
						Цвета проектов по дням до дедлайна:
					</div>
					<div className={styles.deadlineColorSettingsWrapper}>
						<div className={styles.deadlineColorSettingWrapper}>
							<div
								className={`${styles.deadlineColorPreviewPseudoElement} ${styles.deadlineColorPreviewPseudoElementYellow}`}
							></div>
							<TextField
								className={styles.mainSettingsTextField}
								label="Желтый"
								{...register('beforeDeadlineYellowColorDays')}
								helperText={errors.beforeDeadlineYellowColorDays?.message}
								defaultValue={defaultSettings.beforeDeadlineYellowColorDays}
								type="number"
								FormHelperTextProps={{error: !!errors.beforeDeadlineYellowColorDays?.message}}
							/>
						</div>
						<div className={styles.deadlineColorSettingWrapper}>
							<div
								className={`${styles.deadlineColorPreviewPseudoElement} ${styles.deadlineColorPreviewPseudoElementRed}`}
							></div>
							<TextField
								className={styles.mainSettingsTextField}
								label="Красный"
								{...register('beforeDeadlineRedColorDays')}
								helperText={errors.beforeDeadlineRedColorDays?.message}
								defaultValue={defaultSettings.beforeDeadlineRedColorDays}
								type="number"
								FormHelperTextProps={{error: !!errors.beforeDeadlineRedColorDays?.message}}
							/>
						</div>
					</div>
					<div className={styles.projectDurationWrapper}>
						<TextField
							className={styles.mainSettingsTextField}
							label="Длительность проектов по умолчанию"
							{...register('projectDurationDays')}
							helperText={errors.projectDurationDays?.message}
							defaultValue={defaultSettings.projectDurationDays}
							type="number"
							FormHelperTextProps={{error: !!errors.projectDurationDays?.message}}
						/>
					</div>
				</div>
				<div>
					<Button
						type="submit"
						variant="contained"
					>
						Создать
					</Button>
				</div>
			</Box>
		</>
	)
}