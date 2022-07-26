import { changeBandAbout, uploadBandImage, getBandAbout } from 'controllers'
import { validateRequestSchema } from '/middlewares'
import { bandSchema, idSchema } from '/schemas'
import { uploadBandPhoto } from 'utils'
import express from 'express'

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
  uploadBandImage
)

export default router
