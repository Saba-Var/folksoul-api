import { validateRequestSchema } from 'middlewares'
import { authentication } from 'controllers'
import { authSchema } from 'schemas'
import express from 'express'

const router = express.Router()

router.post('/auth', authSchema, validateRequestSchema, authentication)

export default router
