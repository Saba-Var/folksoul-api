import socialLinkSchema from '../schemas/social-link-schema'
import { validateRequestSchema } from '../middlewares/index'
import { addLink } from '../controllers/link-controller'
import express from 'express'

const router = express.Router()

router.post(
  '/add-social-link',
  socialLinkSchema,
  validateRequestSchema,
  addLink
)

export default router
