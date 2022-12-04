import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelper from '../../helpers/FormHelper';
import IFormState from '../../helpers/IFormState';
import MainNav from "../MainNav";
import styles from './styles.module.css';
import * as Yup from 'yup';

const defaultSettings = {
    projectDurationDays: 42,
    beforeDeadlineYellowColorDays: 20,
    beforeDeadlineRedColorDays: 10
};

const basedMainSettingsNumberSchema = Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required("*Поле не может быть пустым")
    .min(1, "Значение не может быть меньше 1")

const validationSchema = Yup.object().shape({
    projectDurationDays: basedMainSettingsNumberSchema,
    beforeDeadlineYellowColorDays: basedMainSettingsNumberSchema
        .test('yellow-more-than-red', '*Кол-во дней не может быть меньше или равным кол-ву дней для красного цвета', (value, ctx) => {
            if (!value) return true;
            return value > ctx.parent.beforeDeadlineRedColorDays;
        }),
    beforeDeadlineRedColorDays: basedMainSettingsNumberSchema
        .test('red-less-than-yellow', '*Кол-во дней не может быть больше или равным кол-ву дней для желтого цвета', (value, ctx) => {
            if (!value) return true;
            return value < ctx.parent.beforeDeadlineYellowColorDays;
        })
})

export default function MainSettingsPage() {
    const [form, setForm] = useState<IFormState>( {
        projectDurationDays: defaultSettings.projectDurationDays,
        beforeDeadlineYellowColorDays: defaultSettings.beforeDeadlineYellowColorDays,
        beforeDeadlineRedColorDays: defaultSettings.beforeDeadlineRedColorDays
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    });

    const formHelper = new FormHelper(form, setForm);
    const handleOnChange = () => formHelper.handleOnChange.bind(formHelper)
    const handleOnSubmit = (data: Object) => {
        alert("Form submit success: " + JSON.stringify(data))
    }

    useEffect(() => {
        reset(formValues => ({
            ...formValues
        }))
      }, [isSubmitSuccessful])

    return ( <>
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
                        <div className={`${styles.deadlineColorPreviewPseudoElement} ${styles.deadlineColorPreviewPseudoElementYellow}`}></div>
                        <TextField
                            className={styles.mainSettingsTextField}
                            label="Желтый"
                            {...register('beforeDeadlineYellowColorDays')}
                            onChange={handleOnChange()}
                            helperText={errors.beforeDeadlineYellowColorDays?.message?.toString()}
                            value={form.beforeDeadlineYellowColorDays}
                            type="number"
                            FormHelperTextProps={ { error: !errors.beforeDeadlineYellowColorDays?.message?.toString() ? false : true} }
                        />
                    </div>
                    <div className={styles.deadlineColorSettingWrapper}>
                        <div className={`${styles.deadlineColorPreviewPseudoElement} ${styles.deadlineColorPreviewPseudoElementRed}`}></div>
                        <TextField
                            className={styles.mainSettingsTextField}
                            label="Красный"
                            {...register('beforeDeadlineRedColorDays')}
                            onChange={handleOnChange()}
                            helperText={errors.beforeDeadlineRedColorDays?.message?.toString()}
                            value={form.beforeDeadlineRedColorDays}
                            type="number"
                            FormHelperTextProps={ { error: !errors.beforeDeadlineRedColorDays?.message?.toString() ? false : true} }
                        />
                    </div>
                    
                </div>

                <div className={styles.projectDurationWrapper}>
                    <TextField
                        className={styles.mainSettingsTextField}
                        label="Длительность проектов по умолчанию"
                        {...register('projectDurationDays')}
                        onChange={handleOnChange()}
                        helperText={errors.projectDurationDays?.message?.toString()}
                        value={form.projectDurationDays}
                        type="number"
                        FormHelperTextProps={ { error: !errors.projectDurationDays?.message?.toString() ? false : true} }
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
    </> )
}