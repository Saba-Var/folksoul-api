import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import { AuthRequestBody } from './types'
import { RequestBody, Response } from '../types'

export const authentication = async (
  req: RequestBody<AuthRequestBody>,
  res: Response
) => {
  try {
    const { username, password } = req.body
    const currentUser = await User.findOne({ username })

    if (!currentUser) {
      return res.status(404).json({ message: 'User not exist' })
    }

    const isMatch = await bcrypt.compare(password, currentUser.password)

    if (isMatch && process.env.ACCESS_TOKEN_SECRET) {
      const accessToken = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET
      )
      return res.status(200).json({ token: accessToken })
    }
    return res.status(404).json({ message: 'Credentials are incorrect!' })
  } catch (error: any) {
    return res.status(404).json(error.message)
  }
}
