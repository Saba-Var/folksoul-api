import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/mongo'
import authRouter from './routes/auth'
import memberRouter from './routes/member'
import { authMiddleware } from './middlewares/index'
import cors from 'cors'

const server = express()

dotenv.config()
connectToMongo()

server.use(express.json())
server.use(authRouter)
server.use(cors())

server.use(authMiddleware)

server.use(memberRouter)

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server listening on port http://localhost:${process.env.SERVER_PORT}`
  )
})
