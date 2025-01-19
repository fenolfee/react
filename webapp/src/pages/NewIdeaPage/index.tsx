// import { useState } from 'react'
import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/input';
import { Textarea } from '../../components/textarea';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import { zCreateIdeaTrpcInput } from '@react/backend/src/router/createIdea/input';

export const NewIdeaPage = () => {
    const createIdea = trpc.createIdea.useMutation()
    const formik = useFormik({
        initialValues: { title: '', nick: '', description: '', text: '' },
        validate: withZodSchema(
            zCreateIdeaTrpcInput
        ),

        onSubmit: async (values) => {
            await(createIdea.mutateAsync(values))
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
                <button type="submit" disabled={formik.isSubmitting}>{
                    formik.isSubmitting ? 'Submitting...' : 'Create Idea'
                    }</button>
            </form>
        </Segment>
    );
};
