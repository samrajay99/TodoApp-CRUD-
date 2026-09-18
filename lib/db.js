import mongoose from 'mongoose'

const memory = globalThis.__daymarkTasks || []
globalThis.__daymarkTasks = memory

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) return false
  if (mongoose.connection.readyState === 1) return true
  await mongoose.connect(process.env.MONGODB_URI)
  return true
}

export { memory }