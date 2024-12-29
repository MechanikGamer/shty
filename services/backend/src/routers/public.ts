import { initTRPC } from '@trpc/server'
import { dummyProcedures } from '../procedures/dummyProcedures'
import { registerProcedures } from '../procedures/registerProcedures'

const t = initTRPC.create()

export const publicRoutes = t.router({
  getDummyData: dummyProcedures.getDummyData,
  createAccount: registerProcedures.register,
})
