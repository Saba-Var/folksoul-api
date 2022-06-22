import Member from '../models/Member'
import { RequestBody } from '../types'
import { AddMemberBody } from './types'

const checkIfGeorgian = (text: string) => {
  const geoRegex = /[\u10A0-\u10FF]/
  const word = text.replace(/\s/g, '')
  for (let i = 0; i < word.length; i++) {
    if (!geoRegex.test(word[i])) return false
  }
  return true
}

export const addMember = async (req: RequestBody<AddMemberBody>, res: any) => {
  try {
    const { name, instrument, orbitLength, color, biography } = req.body
    const newMemberInfo: any = {
      name,
      instrument,
      orbitLength,
      color,
      biography,
    }

    for (const key in newMemberInfo) {
      if (key !== 'orbitLength' && key !== 'color') {
        const param = newMemberInfo[key]
        if (!checkIfGeorgian(param))
          return res.status(400).json({
            message: `Property '${key}' must include only Georgian characters!`,
          })
      }
    }

    const existingMember = await Member.findOne({ name })

    if (existingMember)
      return res
        .status(400)
        .json({ message: `Member '${name}' already exists!` })

    await Member.create(newMemberInfo)

    return res
      .status(201)
      .send({ message: 'Success! Member saved successfully' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
