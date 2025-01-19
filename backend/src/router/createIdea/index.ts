import { z } from 'zod'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const createIdeaTrpcRoute = trpc.procedure
    .input(
        z.object({
            title: z.string().min(1, 'Name is required'),
            nick: z
                .string()
                .regex(/^[a-zA-Z0-9]+$/, 'Ник должен содержать только буковки и циферки')
                .min(1),
            description: z.string().min(1, 'Description is required'),
            text: z.string().min(100, 'Text must contain at least 100 characters'),
        })
    )
    .mutation(({ input }) => {
        ideas.unshift(input)
        return true
    })
