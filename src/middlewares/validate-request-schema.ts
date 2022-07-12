import { ValidateResultReq } from 'middlewares/types'
import { validationResult } from 'express-validator'
import { Response, Next } from 'types'

const validateRequestSchema = (
  req: ValidateResultReq,
  res: Response,
  next: Next
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  return next()
}
export default validateRequestSchema
