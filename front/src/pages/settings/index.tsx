import {yupResolver} from '@hookform/resolvers/yup'
import {Box, TextField} from '@mui/material'
import {Button} from 'antd'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import saveAccountSettings from '../../../api/saveAccountSettings'
import useAccountSettings, {AccountSettings} from '../../../api/useAccountSettings'
import MainLayout from '../../components/MainLayout'
import {saveChangesWithMsg} from '../../saveChangesWithMsg'
import styles from './styles.module.css'

type Form = {
	projectDurationDays: number;
	beforeDeadlineYellowColorDays: number;
	beforeDeadlineRedColorDays: number;
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

interface ContentProps {
	accountSettings: AccountSettings,
}

function Content({accountSettings}: ContentProps) {
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
		await saveChangesWithMsg( async () => {
			await saveAccountSettings({
				daysForDeadlineYellow: data.beforeDeadlineYellowColorDays,
				daysForDeadlineRed: data.beforeDeadlineRedColorDays,
				defaultProjectDurationDays: data.projectDurationDays,
			})
		})
	}

	useEffect(() => {
		reset(formValues => ({
			...formValues,
		}))
	}, [isSubmitSuccessful, reset])

	return (
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
							defaultValue={accountSettings.daysForDeadlineYellow}
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
							defaultValue={accountSettings.daysForDeadlineRed}
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
						defaultValue={accountSettings.defaultProjectDurationDays}
						type="number"
						FormHelperTextProps={{error: !!errors.projectDurationDays?.message}}
					/>
				</div>
			</div>
			<div>
				<Button
					type="primary"
					htmlType="submit"
				>
					Сохранить
				</Button>
			</div>
		</Box>
	)
}

export default function MainSettingsPage() {
	const {data: accountSettings} = useAccountSettings()

	return (
		<MainLayout>
			{accountSettings && <Content accountSettings={accountSettings}/>}
		</MainLayout>
	)
}