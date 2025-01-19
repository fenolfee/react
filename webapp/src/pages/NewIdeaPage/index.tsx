// import { useState } from 'react'
import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/input';
import { Textarea } from '../../components/textarea';
import { withZodSchema } from 'formik-validator-zod';
import {z} from 'zod'
import { trpc } from '../../lib/trpc';

export const NewIdeaPage = () => {
    const createIdea = trpc.createIdea.useMutation()
    const formik = useFormik({
        initialValues: { title: '', nick: '', description: '', text: '' },
        validate: withZodSchema(
          z.object({
            title: z.string().min(1, 'Name is required'),
            nick: z.string().regex(/^[a-zA-Z0-9]+$/, 'Ник должен содержать только буковки и циферки').min(1),
            description: z.string().min(1, 'Description is required'),
            text: z.string().min(100, 'Text must contain at least 100 characters'),
          })
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
                <button type="submit">Create Idea</button>
            </form>
        </Segment>
    );
};
