import Member from '../models/Member'
import { RequestBody, Response } from '../types'
import { AddMemberBody, changeMemberBody } from './types'
import mongoose from 'mongoose'
import deleteFile from '../util/file'
import georgianLan from '../util/georgianLan'
import multer from 'multer'

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
            message: `'${key}' მხოლოდ ქართულ ასოებს უნდა შეიცავდეს!`,
          })
      }
    }

    const existingMember = await Member.findOne({ name })

    if (existingMember)
      return res
        .status(409)
        .json({ message: `'${name}' უკვე არის ბენდის წევრი!` })

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

    const members = req.query.page
      ? await Member.find()
          .select('-__v')
          .skip((page - 1) * membersPerPage)
          .limit(membersPerPage)
      : await Member.find().select('-__v')

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
    if (member.image) deleteFile(`public/${member.image}`)
    await Member.deleteOne(id)
    return res.status(200).json({ message: 'ბენდის წევრი წაიშალა!' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const changeMember = async (
  req: RequestBody<changeMemberBody>,
  res: Response
) => {
  try {
    const { id, name, instrument, color, biography, orbitLength } = req.body

    const member: any = await Member.findById(id).select('-__v')

    if (!member)
      res.status(404).json({
        message: 'წევრი ვერ მოიძებნა',
      })

    member.name = name
    member.instrument = instrument
    member.color = color
    member.orbitLength = orbitLength
    member.biography = biography

    await member.save()
    return res.status(200).json({ message: 'წევრის ინფორმაცია შეიცვალა!' })
  } catch (err) {
    return res
      .status(409)
      .json({ message: `'${req.body.name}' უკვე არის ბენდის წევრი!` })
  }
}

export const getOneMember = async (
  req: RequestBody<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.body
    const currentMember = await Member.findById(id).select('-__v')

    if (!currentMember)
      return res.status(404).json({ message: 'ბენდის წევრი ვერ მოიძებნა!' })
    return res.status(200).json(currentMember)
  } catch (error) {
    return res.status(422).json({ message: 'წევრის id არ არის ვალიდური' })
  }
}

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `member-${req.body.id}.${ext}`)
  },
})

const multerFilter = async (req: any, file: any, cb: any) => {
  const currentMember = await Member.findById(req.body.id)
  if (file.mimetype.startsWith('image') && currentMember) {
    cb(null, true)
  } else if (file.mimetype.startsWith('image')) {
    req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!'
    return cb(null, false, req.fileValidationError)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

export const uploadMemberPhoto = upload.single('photo')

export const uploadImage = async (
  req: RequestBody<{ id: string; fileValidationError: any }>,
  res: Response
) => {
  try {
    const currentMember = await Member.findById(req.body.id)
    if (!currentMember)
      return res.status(404).json({ message: 'ბენდის წევრი ვერ მოიძებნა!' })

    if (req.body.fileValidationError)
      return res.status(422).json({ message: 'ატვირთეთ მხოლოდ სურათი!' })

    if (req.file) {
      currentMember.image = req.file.path.substring(7)
      await currentMember.save()
      return res.status(201).json({
        message: 'ბენდის წევრის ავატარი წარმატებით აიტვირთა!',
      })
    } else
      return res.status(422).json({ message: 'ატვირთეთ ბენდის წევრის ავატარი' })
  } catch (error) {
    return res.status(422).json({ message: 'წევრის id არ არის ვალიდური' })
  }
}
