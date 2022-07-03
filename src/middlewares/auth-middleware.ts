import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response, Next } from '../types'

const authMiddleware = (req: any, res: Response, next: Next) => {
  try {
    if (req.url === '/band-about' || req.url === '/all-members') {
      return next()
    }

    const secretText = process.env.ACCESS_TOKEN_SECRET
    if (secretText) {
      const { authorization } = req.headers
      if (!authorization)
        return res.status(401).json({
          message: 'missing authorization header',
        })

      const token = authorization.trim().split(' ')[1]
      let verified: string | JwtPayload
      verified = jwt.verify(token, secretText)

      if (verified) return next()
      return res.status(401).json({ message: 'User is not authorized' })
    }
  } catch (error: any) {
    console.log(error)
    return res.status(403).json({ message: 'Token is not valid' })
  }
}

export default authMiddleware
