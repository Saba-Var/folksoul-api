import { validateRequestSchema } from '/middlewares/index'
import { uploadBandPhoto } from 'utils/storage'
import bandSchema from '/schemas/band-schema'
import idSchema from '/schemas/id-schema'
import express from 'express'
import {
  getBandAbout,
  changeBandAbout,
  uploadImage,
} from 'controllers/band-controller'

const router = express.Router()

router.get('/band-about', getBandAbout)

router.put(
  '/change-band-about',
  idSchema,
  bandSchema,
  validateRequestSchema,
  changeBandAbout
)

router.patch(
  '/upload-band-image',
  uploadBandPhoto,
  idSchema,
  validateRequestSchema,
  uploadImage
)

export default router
