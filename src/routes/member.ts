import express from 'express'
import {
  addMember,
  getAllMembers,
  deleteMember,
  changeMember,
  getOneMember,
  uploadImage,
  uploadMemberPhoto,
} from '../controllers/member-controller'
import idSchema from '../schemas/id-schema'
import memberDetailsSchema from '../schemas/member-details-schema'
import { validateRequestSchema } from '../middlewares/index'

const router = express.Router()

router.get('/all-members', getAllMembers)

router.delete('/delete-member', idSchema, validateRequestSchema, deleteMember)

router.post('/get-one-member', idSchema, validateRequestSchema, getOneMember)

router.post(
  '/add-member',
  memberDetailsSchema,
  validateRequestSchema,
  addMember
)

router.put(
  '/change-member',
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
