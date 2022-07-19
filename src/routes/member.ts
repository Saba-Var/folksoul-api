import { validateRequestSchema, validateGeorgianLan } from 'middlewares/index'
import memberDetailsSchema from 'schemas/member-details-schema'
import { uploadMemberPhoto } from 'utils/storage'
import idSchema from 'schemas/id-schema'
import express from 'express'
import {
  getAllMembers,
  deleteMember,
  changeMember,
  getOneMember,
  uploadImage,
  addMember,
} from 'controllers/member-controller'

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
  uploadImage
)

export default router
