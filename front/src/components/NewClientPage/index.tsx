import * as Yup from 'yup'
import MainNav from '../MainNav'
import {useRouter} from 'next/router'
import {Box, Button, TextField} from '@mui/material'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type Form = {
    fullname: string;
    source: string;
    phone: string;
    email: string;
    description?: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Поле не должно быть пустым'),
    source: Yup.string().required('Поле не должно быть пустым'),
    phone: Yup
        .string()
        .matches(phoneRegExp, 'Некорректный номер телефона'),
    email: Yup
        .string()
        .required('Поле не должно быть пустым')
        .email('Некорректный email'),
    description: Yup.string().nullable(true)
})

export default function NewClientPage() {
    const router = useRouter()

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
                component='form'
                onSubmit={handleSubmit(handleOnSubmit)}
                className={styles.form}
            >
                <TextField
                    margin='normal'
                    label='ФИО'
                    autoFocus
                    {...register('fullname')}
                    FormHelperTextProps={{error: !!errors.fullname?.message}}
                    helperText={errors.fullname?.message}
                />
                <TextField
                    margin='normal'
                    label='Канал привлечения'
                    autoFocus
                    {...register('source')}
                    FormHelperTextProps={{error: !!errors.source?.message}}
                    helperText={errors.source?.message}
                />
                <TextField
                    margin='normal'
                    label='Телефон'
                    autoFocus
                    {...register('phone')}
                    FormHelperTextProps={{error: !!errors.phone?.message}}
                    helperText={errors.phone?.message}
                />
                <TextField
                    margin='normal'
                    label='Почта'
                    autoFocus
                    type='email'
                    {...register('email')}
                    FormHelperTextProps={{error: !!errors.email?.message}}
                    helperText={errors.email?.message}
                />
                <TextField
                    label='Описание'
                    multiline
                    minRows={4}
                    maxRows={16}
                    {...register('description')}
                    FormHelperTextProps={{error: !!errors.description?.message}}
                    helperText={errors.description?.message}
                />
                <div>
                    <Button
                        type='submit'
                        variant='contained'
                        className={styles.button}
                    >
                        Создать
                    </Button>
                </div>
            </Box>
        </>
    )
}