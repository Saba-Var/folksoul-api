import socialLinkSchema from '../schemas/social-link-schema'
import { validateRequestSchema } from '../middlewares/index'
import idSchema from '../schemas/id-schema'
import express from 'express'
import {
  addLink,
  getAllLinks,
  deleteLink,
} from '../controllers/link-controller'

const router = express.Router()

router.get('/all-links', getAllLinks)

router.delete('/delete-link', idSchema, validateRequestSchema, deleteLink)

router.post(
  '/add-social-link',
  socialLinkSchema,
  validateRequestSchema,
  addLink
)

export default router
