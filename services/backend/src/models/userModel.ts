import mongoose, { Document, Schema } from 'mongoose'

interface User extends Document {
  name: string
  surname: string
  email: string
  passwordHash: string
  accountType: string
  emailVerificationCode: number
  emailVerified: boolean
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    accountType: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: Number },
  },
  {
    timestamps: true,
  },
)

export type { User }
const UserModel = mongoose.model<User>('User', userSchema)
export { UserModel }
