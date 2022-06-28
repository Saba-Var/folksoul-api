import { check } from 'express-validator'

const memberDetailsSchema = [
  check('name')
    .trim()
    .isLength({
      min: 3,
    })
    .withMessage('Name should be at least 3 characters long'),
  check('instrument')
    .exists()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Instrument should be at least 2 characters long'),
  check('orbitLength')
    .exists()
    .trim()
    .withMessage('Orbit Length is required')
    .isNumeric()
    .withMessage('Orbit Length must be number'),
  check('color')
    .trim()
    .isLength({
      min: 7,
      max: 7,
    })
    .withMessage(
      "Color should be exactly 7 characters long and start with '#'"
    ),
  check('biography').trim().notEmpty().withMessage('Biography is required'),
]

export default memberDetailsSchema
