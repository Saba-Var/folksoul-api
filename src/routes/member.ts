import { validateRequestSchema, validateGeorgianLan } from 'middlewares'
import { memberDetailsSchema, idSchema } from 'schemas'
import { uploadMemberPhoto } from 'utils'
import express from 'express'
import {
  uploadMemberImage,
  getAllMembers,
  deleteMember,
  changeMember,
  getOneMember,
  addMember,
} from 'controllers'

const router = express.Router()

router.get('/all-members', getAllMembers)

router.delete('/delete-member', idSchema, validateRequestSchema, deleteMember)

router.get('/get-one-member', idSchema, validateRequestSchema, getOneMember)

router.post(
  '/add-member',
  memberDetailsSchema,
  validateRequestSchema,
  validateGeorgianLan,
  addMember
)

router.put(
  '/change-member',
  idSchema,
  memberDetailsSchema,
  validateRequestSchema,
  changeMember
)

router.patch(
  '/upload-member-image',
  uploadMemberPhoto,
  idSchema,
  validateRequestSchema,
  uploadMemberImage
)

export default router
