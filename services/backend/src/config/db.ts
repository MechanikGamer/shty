import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

let isDbConnected = false

const connectToDb = async () => {
  const dbUri = process.env.MONGODB_URI

  if (dbUri === undefined) {
    throw new Error('MONGODB_URI is not defined')
  }
  try {
    const db = await mongoose.connect(dbUri, {})
    console.log('Connected to MongoDB')
    isDbConnected = true
    return db
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Could not connect to database')
  }
}

export const getDbConnection = async () => {
  if (!isDbConnected) {
    await connectToDb()
  }
  return mongoose
}
