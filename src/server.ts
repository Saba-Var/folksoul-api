import { authMiddleware } from './middlewares/index'
import { swaggerMiddleware } from './middlewares/index'
import connectToMongo from './config/mongo'
import SwaggerUI from 'swagger-ui-express'
import memberRouter from './routes/member'
import authRouter from './routes/auth'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const server = express()

dotenv.config()
connectToMongo()

server.use(express.json())
server.use('/api-docs', SwaggerUI.serve, swaggerMiddleware())

server.use(authRouter)
server.use(cors())

server.use(express.static('public'))
server.use(authMiddleware)

server.use(memberRouter)

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server listening on port http://localhost:${process.env.SERVER_PORT}`
  )
})
