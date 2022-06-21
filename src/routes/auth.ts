import express from 'express'
import { authentication } from '../controllers/auth-controller'
import { validateRequestSchema } from '../middlewares/index'
import authSchema from '../schemas/auth-schema'

const router = express.Router()

router.post('/auth', authSchema, validateRequestSchema, authentication)

export default router
