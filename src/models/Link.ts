import { NewLink } from 'models'
import mongoose from 'mongoose'

const { Schema } = mongoose

const linkSchema = new Schema<NewLink>({
  linkName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  url: { type: String, required: true },

  image: {
    type: String,
    required: false,
  },
})

const Link = mongoose.model('link', linkSchema)

export default Link
