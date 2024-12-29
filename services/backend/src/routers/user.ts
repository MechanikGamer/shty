import { initTRPC } from '@trpc/server'
import { userProcedures } from '../procedures/userProcedures'

const t = initTRPC.create()

export const userRoutes = t.router({
  createUser: userProcedures.createUser,
})
