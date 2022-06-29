import { getBandAbout, changeBandAbout } from '../controllers/band-controller'
import { validateRequestSchema } from '../middlewares/index'
import bandSchema from '../schemas/band-schema'
import express from 'express'

const router = express.Router()

router.get('/band-about', getBandAbout)

router.put(
  '/change-band-about',
  bandSchema,
  validateRequestSchema,
  changeBandAbout
)

export default router
