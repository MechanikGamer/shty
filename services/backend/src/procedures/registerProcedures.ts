import { initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { UserModel } from '../models/userModel'
import { TRPCError } from '@trpc/server';

const t = initTRPC.create()

const generateEmailVerificationCode = () => Math.floor(100000 + Math.random() * 900000);

const formatZodErrors = (zodError: z.ZodError) => {
  return zodError.errors.map((error) => ({
    field: error.path.join('.'),
    message: error.message,
  }));
};

export const registerProcedures = t.router({
  register: t.procedure
    .input(
      z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long' })
          .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: 'Password must contain a special character',
          }),
        confirmPassword: z
          .string()
          .min(8, { message: 'Confirm password must be at least 8 characters long' })
          .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: 'Confirm password must contain a special character',
          }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email, password, confirmPassword } = input;

        if (password !== confirmPassword) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Passwords do not match' });
        }

        const existingUsers = await UserModel.scan({ email }).exec();
        if (existingUsers.count > 0) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Email already in use' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
          SK: 'User',
          accountType: 'basic',
          email,
          password: passwordHash,
          emailVerificationCode: generateEmailVerificationCode(),
        });

        await newUser.save();

        return {
          success: true,
          message: 'User registered successfully',
          userId: newUser.PK,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Validation failed',
            cause: formatZodErrors(error),
          });
        }

        if (error instanceof TRPCError) {
          throw error;
        }

        console.error('Unexpected error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        });
      }
    }),
});