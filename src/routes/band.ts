import { validateRequestSchema } from '/middlewares/index'
import bandSchema from '/schemas/band-schema'
import idSchema from '/schemas/id-schema'
import express from 'express'
import {
  getBandAbout,
  changeBandAbout,
  uploadImage,
  uploadBandPhoto,
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
