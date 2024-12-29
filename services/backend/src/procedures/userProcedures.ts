import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { getDbConnection } from '../config/db'
import { UserModel } from '../models/userModel'

const t = initTRPC.create()

const userInputSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const userProcedures = t.router({
  createUser: t.procedure.input(userInputSchema).mutation(async opts => {
    const { input } = opts
    const db = await getDbConnection()
    const newUser = new UserModel(input)
    await newUser.save()
    return newUser
  }),
})
