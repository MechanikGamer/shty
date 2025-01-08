import { initTRPC } from '@trpc/server'
import { registerProcedures } from '../procedures/registerProcedures'
import { urlProcedures } from '../procedures/urlProcedures'

const t = initTRPC.create()

export const publicRoutes = t.router({
  createAccount: registerProcedures.register,
  createUrl : urlProcedures.createUrl,
})
