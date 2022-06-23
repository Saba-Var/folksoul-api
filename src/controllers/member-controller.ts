import Member from '../models/Member'
import { RequestBody, Response } from '../types'
import { AddMemberBody } from './types'

const checkIfGeorgian = (text: string) => {
  const geoRegex = /[\u10A0-\u10FF]/
  const word = text.replace(/\s/g, '')
  for (let i = 0; i < word.length; i++) {
    if (!geoRegex.test(word[i])) return false
  }
  return true
}

export const addMember = async (
  req: RequestBody<AddMemberBody>,
  res: Response
) => {
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
      .json({ message: 'Success! Member saved successfully' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllMembers = async (
  req: {
    query: {
      page: string
    }
  },
  res: Response
) => {
  try {
    let page: number
    if (req.query.page) page = +req.query.page
    else page = 1

    const membersPerPage = 3

    const totalMembers = await Member.find().countDocuments()

    const members = await Member.find()
      .select('-__v')
      .skip((page - 1) * membersPerPage)
      .limit(membersPerPage)

    if (members.length === 0) return res.status(200).json([])

    const paginationInfo = {
      totalMembers: totalMembers,
    }

    return res.status(200).json({ members, paginationInfo })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
