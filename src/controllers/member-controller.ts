import Member from '../models/Member'
import { RequestBody, Response } from '../types'
import { AddMemberBody } from './types'
import mongoose from 'mongoose'

const georgianLan = (text: string, key: string) => {
  const geoRegex = /[\u10A0-\u10FF]/
  const word = text.replace(/\s/g, '')

  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    const isGeorgian = geoRegex.test(char)
    if (key !== 'biography' && !isGeorgian) return false
    if (!isGeorgian && !/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(char) && !+char)
      return false
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
        if (!georgianLan(param, key))
          return res.status(400).json({
            message: `'${key}' მხოლოდ წართულ ასოებ უნდა შეიცავდეს!`,
          })
      }
    }

    const existingMember = await Member.findOne({ name })

    if (existingMember)
      return res
        .status(400)
        .json({ message: `ბენდის წევრი უკვე არის '${name}'!` })

    await Member.create(newMemberInfo)

    return res.status(201).json({ message: 'ბენდს წევრი წარმატებით დაემატა!' })
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

    if (members.length === 0)
      return res.status(200).json({
        members: [
          {
            biography: '',
            color: '',
            instrument: '',
            name: '',
            orbitLength: 0,
            _id: '',
          },
        ],
        paginationInfo: {
          totalMembers: 0,
        },
      })

    const paginationInfo = {
      totalMembers: totalMembers,
    }

    return res.status(200).json({ members, paginationInfo })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteMember = async (
  req: RequestBody<{ id: string }>,
  res: Response
) => {
  try {
    const id = { _id: new mongoose.Types.ObjectId(req.body.id) }
    const member = await Member.findOne(id)
    if (!member) return res.status(404).json({ message: 'წევრი ვერ მოიძებნა' })
    await Member.deleteOne(id)
    return res.status(200).json({ message: 'ბენდის წევრი წაიშალა!' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
