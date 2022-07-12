import { Response, Next, RequestBody } from 'types'
import { AddMemberBody } from 'controllers/types'
import georgianLan from 'utils/georgianLan'

const validateGeorgianLan = (
  req: RequestBody<AddMemberBody>,
  res: Response,
  next: Next
) => {
  const { name, instrument, orbitLength, color, biography } = req.body

  const newMemberInfo: any = {
    orbitLength,
    instrument,
    biography,
    color,
    name,
  }

  for (const key in newMemberInfo) {
    if (key !== 'orbitLength' && key !== 'color') {
      if (!georgianLan(newMemberInfo[key], key)) {
        return res.status(422).json({
          message: `'${key}' მხოლოდ ქართულ ასოებს უნდა შეიცავდეს!`,
        })
      }
    }
  }

  next()
}
export default validateGeorgianLan
