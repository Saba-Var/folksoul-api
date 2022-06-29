import { check } from 'express-validator'

const bandSchema = [
  check('about')
    .trim()
    .isLength({ min: 1 })
    .withMessage('შეიყვანეთ ვენდის შესახებ ინფორმაცია'),
]

export default bandSchema
