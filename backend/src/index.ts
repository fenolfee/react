import express, { Response, Request } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (_req: Request, res: Response) => {
    res.send('pong')
})

expressApp.use(
    '/trpc', 
    trpcExpress.createExpressMiddleware({
        router: trpcRouter
    })
)

expressApp.listen(3000, () => {
    console.info('listening at http://localhost:3000')
})