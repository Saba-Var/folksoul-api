import { authentication } from '../controllers/auth-controller'
import { validateRequestSchema } from '../middlewares/index'
import authSchema from '../schemas/auth-schema'
import express from 'express'

const router = express.Router()

router.post('/auth', authSchema, validateRequestSchema, authentication)

export default router
