import { check } from 'express-validator'

const idSchema = [
  check('id')
    .trim()
    .isLength({ min: 24, max: 24 })
    .withMessage('id უნდა შეიცავდეს ზუსტად 24 სიმბოლოს'),
]

export default idSchema
