import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import dotenv from 'dotenv'
import express from 'express'
import { appRouter } from './server'
import { getDbConnection } from './src/config/db'

dotenv.config()

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

if (PORT === undefined) {
  throw new Error('PORT is not defined')
}

if (ENV === undefined) {
  throw new Error('NODE_ENV is not defined')
}

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()
const app = express()

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: console.log,
  }),
)

app.listen(PORT, async () => {
  await getDbConnection()
  if (ENV === 'development') {
    console.log(`Server is running on http://localhost:${PORT}`)
  } else {
    console.log(`Server is running on port ${PORT}`)
  }
})

export type { AppRouter } from './server'
