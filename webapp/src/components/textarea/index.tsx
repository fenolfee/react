import { FormikProps } from "formik"

export const Textarea = ({
    name,
    label,
    formik
}: {
    name: string,
    label: string
    formik: FormikProps<any>
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name] as boolean;
    return (
        <div style={{ marginBottom: 10 }}>
        <label htmlFor={name}>{label}</label>
        <br />
        <textarea
          onChange={(e) => {
            formik.setFieldValue(name, e.target.value)
          }}
          value={value}
          name={name}
          id={name}
        />
        {touched && error && <div className="error">{error}</div>}
      </div>
    )
}