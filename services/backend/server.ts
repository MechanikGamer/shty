import { initTRPC } from '@trpc/server'
import { adminRoutes } from './src/routers/admin'
import { publicRoutes } from './src/routers/public'
import { userRoutes } from './src/routers/user'

const t = initTRPC.create()

export const appRouter = t.router({
  public: publicRoutes,
  user: userRoutes,
  admin: adminRoutes,
})

export type AppRouter = typeof appRouter
