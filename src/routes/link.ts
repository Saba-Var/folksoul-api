import { validateRequestSchema } from 'middlewares'
import { socialLinkSchema } from 'schemas'
import { uploadLinkPhoto } from 'utils'
import { idSchema } from 'schemas'
import express from 'express'
import {
  getAllLinks,
  uploadImage,
  deleteLink,
  changeLink,
  addLink,
} from 'controllers'

const router = express.Router()

router.get('/all-links', getAllLinks)

router.delete('/delete-link', idSchema, validateRequestSchema, deleteLink)

router.post(
  '/add-social-link',
  socialLinkSchema,
  validateRequestSchema,
  addLink
)

router.put(
  '/change-link',
  idSchema,
  socialLinkSchema,
  validateRequestSchema,
  changeLink
)

router.patch(
  '/upload-link-image',
  uploadLinkPhoto,
  idSchema,
  validateRequestSchema,
  uploadImage
)

export default router
