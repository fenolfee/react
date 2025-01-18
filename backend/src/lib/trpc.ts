import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import {  Server } from 'express'
import { type TrpcRouter } from '../router'

export const trpc = initTRPC.create()

export const applyTrpcToExpressApp = (expressApp: Server, trpcRouter: TrpcRouter) => {
  (expressApp as any).use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter as any,
    })
  )
}