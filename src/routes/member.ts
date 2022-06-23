import express from 'express'
import {
  addMember,
  getAllMembers,
  deleteMember,
} from '../controllers/member-controller'
import idSchema from '../schemas/id-schema'
import memberDetailsSchema from '../schemas/member-details-schema'
import { validateRequestSchema } from '../middlewares/index'

const router = express.Router()

router.get('/all-members', getAllMembers)

router.delete('/delete-member', idSchema, validateRequestSchema, deleteMember)

router.post(
  '/add-member',
  memberDetailsSchema,
  validateRequestSchema,
  addMember
)

export default router
