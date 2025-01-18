import express, { Response, Request } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (_req: Request, res: Response) => {
    res.send('pong')
})

applyTrpcToExpressApp(expressApp, trpcRouter)
expressApp.listen(3000, () => {
    console.info('listening at http://localhost:3000')
})
