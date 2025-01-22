import { FormikProps } from 'formik'
import  cn  from 'classnames'
import css from './index.module.scss'
export const Textarea = ({
    name,
    label,
    formik,
    maxWidth,
}: {
    name: string
    label: string
    formik: FormikProps<any>
    maxWidth?: number
}) => {
    const value = formik.values[name]
    const error = formik.errors[name] as string | undefined
    const touched = formik.touched[name] as boolean
    const disabled = formik.isSubmitting
    return (
        <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
            <label className={css.label} htmlFor={name}>
                {label}
            </label>
            <textarea
                className={cn({ [css.input]: true, [css.invalid]: touched && error })}
                style={{ maxWidth }}
                onChange={(e) => {
                    formik.setFieldValue(name, e.target.value)
                }}
                value={value}
                name={name}
                id={name}
                disabled={formik.isSubmitting}
            />
            {touched && error && <div className={css.error}>{error}</div>}
        </div>
    )
}
