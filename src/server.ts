import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/mongo'
import authRouter from './routes/auth'

const server = express()

dotenv.config()
connectToMongo()

server.use(express.json())

server.use(authRouter)

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server listening on port http://localhost:${process.env.SERVER_PORT}`
  )
})
