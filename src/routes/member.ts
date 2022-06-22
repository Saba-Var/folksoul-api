import express from 'express'
import { addMember } from '../controllers/member-controller'
import memberDetailsSchema from '../schemas/member-details-schema'
import { validateRequestSchema } from '../middlewares/index'

const router = express.Router()

router.post(
  '/add-member',
  memberDetailsSchema,
  validateRequestSchema,
  addMember
)

export default router
