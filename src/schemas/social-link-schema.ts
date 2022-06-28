import { check } from 'express-validator'

const socialLinkSchema = [
  check('linkName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('ბმულის დასახელება უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსაგან'),

  check('url')
    .trim()
    .notEmpty()
    .withMessage('url-ის მითითება სავალდებულოა')
    .isURL()
    .withMessage('მიუთითეთ ვალიდური ბმული'),
]

export default socialLinkSchema
