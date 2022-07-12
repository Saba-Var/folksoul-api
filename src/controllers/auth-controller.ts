import { AuthRequestBody } from 'controllers/types'
import { RequestBody, Response } from 'types'
import User from 'models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const authentication = async (
  req: RequestBody<AuthRequestBody>,
  res: Response
) => {
  try {
    const { username, password } = req.body
    const currentUser = await User.findOne({ username })

    if (!currentUser) {
      return res.status(404).json({ message: 'მომხმარებელი ვერ მოიძებნა' })
    }

    const isMatch = await bcrypt.compare(password, currentUser.password)

    if (isMatch && process.env.ACCESS_TOKEN_SECRET) {
      const accessToken = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET
      )

      return res.status(201).json({ token: accessToken })
    }

    return res
      .status(404)
      .json({ message: 'მომხმარებლის მონაცემები არასწორია!' })
  } catch (error: any) {
    return res.status(404).json(error.message)
  }
}
