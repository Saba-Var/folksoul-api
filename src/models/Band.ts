import { BandModel } from 'models'
import mongoose from 'mongoose'

const { Schema } = mongoose

const bandSchema = new Schema<BandModel>({
  about: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  image: {
    type: String,
    required: false,
  },
})

const Band = mongoose.model('band', bandSchema)

export default Band
