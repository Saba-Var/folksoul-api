import mongoose from 'mongoose'

const { Schema } = mongoose

interface IUser {
  username: string
  password: string
}

const userSchema = new Schema<IUser>({
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
