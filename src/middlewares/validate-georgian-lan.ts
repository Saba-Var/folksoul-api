import { Response, Next, RequestBody } from 'types'
import { AddMemberBody } from 'controllers/types'
import { ValidateWords } from 'middlewares/types'
import georgianLan from 'utils/georgianLan'

const validateGeorgianLan = (
  req: RequestBody<AddMemberBody>,
  res: Response,
  next: Next
) => {
  const { name, instrument, biography } = req.body

  const newMemberInfo: ValidateWords = {
    instrument,
    biography,
    name,
  }

  for (const key in newMemberInfo) {
    if (!georgianLan(newMemberInfo[key as keyof typeof newMemberInfo], key)) {
      return res.status(422).json({
        message: `'${key}' მხოლოდ ქართულ ასოებს უნდა შეიცავდეს!`,
      })
    }
  }

  next()
}
export default validateGeorgianLan
