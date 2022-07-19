import { swaggerMiddleware } from 'middlewares/index'
import { authMiddleware } from 'middlewares/index'
import express, { RequestHandler } from 'express'
import SwaggerUI from 'swagger-ui-express'
import connectToMongo from 'config/mongo'
import memberRouter from 'routes/member'
import authRouter from 'routes/auth'
import linkRouter from 'routes/link'
import bandRouter from 'routes/band'
import dotenv from 'dotenv'
import cors from 'cors'

const server = express()
server.use(cors())

dotenv.config()
connectToMongo()

server.use(express.json())
server.use('/api-docs', SwaggerUI.serve, swaggerMiddleware())

server.use(authRouter)

server.use(express.static('public'))

server.use(authMiddleware as RequestHandler)

server.use(memberRouter)
server.use(linkRouter)
server.use(bandRouter)

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server listening on port http://localhost:${process.env.SERVER_PORT}`
  )
})
