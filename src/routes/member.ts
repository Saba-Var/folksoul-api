import express from 'express'
import { addMember, getAllMembers } from '../controllers/member-controller'
import memberDetailsSchema from '../schemas/member-details-schema'
import { validateRequestSchema } from '../middlewares/index'

const router = express.Router()

router.get('/all-members', getAllMembers)

router.post(
  '/add-member',
  memberDetailsSchema,
  validateRequestSchema,
  addMember
)

export default router
