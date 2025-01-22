import { FormikProps } from 'formik'
import css from './index.module.scss'
import cn from 'classnames'

export const Input = ({ name, label, formik, maxWidth }: { name: string; label: string; formik: FormikProps<any>; maxWidth?: number }) => {
    const value = formik.values[name]
    const error = formik.errors[name] as string | undefined
    const touched = formik.touched[name] as boolean
    const disabled = formik.isSubmitting
    return (
        <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
            <label className={css.label} htmlFor={name}>
                {label}
            </label>
            <input
                className={
                    cn({ [css.input]: true, [css.invalid]: touched && error })
                }
                style={{maxWidth}}
                type="text"
                onChange={(e) => {
                    formik.setFieldValue(name, e.target.value)
                }}
                onBlur={() => {
                    formik.setFieldTouched(name, true)
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
