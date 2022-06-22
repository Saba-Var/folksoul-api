import mongoose from 'mongoose'
import { NewMember } from './types'

const { Schema } = mongoose

const memberSchema = new Schema<NewMember>({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  instrument: {
    type: String,
    required: true,
    minlength: 2,
  },

  orbitLength: {
    type: Number,
    required: true,
  },

  color: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
  },

  biography: {
    type: String,
    required: true,
  },
})

const Member = mongoose.model('member', memberSchema)

export default Member
