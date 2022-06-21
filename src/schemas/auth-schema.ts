import { check } from 'express-validator'

const authSchema = [
  check('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isLowercase()
    .withMessage('Username should not contain upper case letters'),
  check('password').notEmpty().withMessage('Password is required'),
]

export default authSchema
