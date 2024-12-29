import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const dummyProcedures = t.router({
  getDummyData: t.procedure.query(() => {
    return { message: 'This is dummy data' }
  }),
})
