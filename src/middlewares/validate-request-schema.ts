import { validationResult } from 'express-validator'
import { ValidateResultReq } from './types'
import { Response, Next } from '../types'

const validateRequestSchema = (
  req: ValidateResultReq,
  res: Response,
  next: Next
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  return next()
}
export default validateRequestSchema
