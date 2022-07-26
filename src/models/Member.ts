import { NewMember } from 'models'
import mongoose from 'mongoose'

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

  image: {
    type: String,
    required: false,
  },
})

const Member = mongoose.model('member', memberSchema)

export default Member
