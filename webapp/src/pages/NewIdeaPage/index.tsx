// import { useState } from 'react'
import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/input';
import { Textarea } from '../../components/textarea';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import { zCreateIdeaTrpcInput } from '@react/backend/src/router/createIdea/input';
import { useState } from 'react';

export const NewIdeaPage = () => {
    const [submittingError, setSubmittingError] = useState<string|null>(null);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const createIdea = trpc.createIdea.useMutation()
    const formik = useFormik({
        initialValues: { title: '', nick: '', description: '', text: '' },
        validate: withZodSchema(
            zCreateIdeaTrpcInput
        ),

        onSubmit: async (values) => {
            try {
            await(createIdea.mutateAsync(values))
            formik.resetForm()
            setSuccessMessageVisible(true);
            setTimeout(() => setSuccessMessageVisible(false), 3000);
            } catch (error:any) {
                setSubmittingError(error.message);
            }
        },
    });
    return (
        <Segment title="New Idea">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                <Input name="title" label="Title" formik={formik} />
                <Input name="nick" label="Nick" formik={formik} />
                <Input name="description" label="Description" formik={formik} />
                <Textarea name="text" label="Text" formik={formik} />
                {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Form is invalid</div>}
                {submittingError && <div style={{ color:'red' }}>{submittingError}</div>}
                {successMessageVisible && <div style={{ color: 'green' }}>Idea created successfully!</div>}
                <button type="submit" disabled={formik.isSubmitting}>{
                    formik.isSubmitting ? 'Submitting...' : 'Create Idea'
                    }</button>
            </form>
        </Segment>
    );
};
