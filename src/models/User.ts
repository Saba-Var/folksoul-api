import mongoose from 'mongoose'
import { NewUser } from './types'

const { Schema } = mongoose

const userSchema = new Schema<NewUser>({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  password: { type: String, required: true },
})

const User = mongoose.model('user', userSchema)

export default User
