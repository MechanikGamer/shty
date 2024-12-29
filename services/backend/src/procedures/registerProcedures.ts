import { initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { UserModel } from '../models/userModel'

const t = initTRPC.create()

const emailVerificationCode = Math.floor(100000 + Math.random() * 900000)

export const registerProcedures = t.router({
  register: t.procedure
    .input(
      z.object({
        accountType: z.string().default('Personal'),
        name: z.string().min(1, { message: 'Name is required' }),
        surname: z.string().min(1, { message: 'Surname is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long' })
          .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: 'Password must contain a special character',
          }),
        confirmPassword: z
          .string()
          .min(8, { message: 'Confirm password must be at least 8 characters long' })
          .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: 'Confirm password must contain a special character',
          }),
      }),
    )
    .mutation(async ({ input }) => {
      const { accountType, name, surname, email, password, confirmPassword } = input

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const existingUser = await UserModel.findOne({ email })
      if (existingUser) {
        throw new Error('Email already in use')
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const newUser = new UserModel({
        name,
        surname,
        email,
        passwordHash,
        accountType,
        emailVerificationCode,
      })

      await newUser.save()

      return { success: true, message: 'User registered successfully', userId: newUser._id }
    }),
})
