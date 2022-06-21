import { validationResult } from 'express-validator'
import { Response } from '../types'
import { ValidateResult, ValidateResultReq } from './types'

const validateRequestSchema = (
  req: ValidateResultReq,
  res: Response<ValidateResult>,
  next: () => void
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  return next()
}
export default validateRequestSchema
