import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/mongo'

const server = express()

dotenv.config()
connectToMongo()

server.use(express.json())

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server listening on port http://localhost:${process.env.SERVER_PORT}`
  )
})
