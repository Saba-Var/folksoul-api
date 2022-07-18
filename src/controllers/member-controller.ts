import { MemberModel, QueryId } from 'controllers/types'
import { RequestBody, Response } from 'types'
import deleteFile from 'utils/deleteFile'
import storage from 'utils/storage'
import Member from 'models/Member'
import mongoose from 'mongoose'
import {
  ChangeMemberBody,
  AddMemberBody,
  RequestQuery,
  ImageReqBody,
} from 'controllers/types'

export const addMember = async (
  req: RequestBody<AddMemberBody>,
  res: Response
) => {
  try {
    const { name, instrument, orbitLength, color, biography } = req.body

    const newMemberInfo: any = {
      orbitLength,
      instrument,
      biography,
      color,
      name,
    }

    const existingMember = await Member.findOne({ name })

    if (existingMember) {
      return res
        .status(409)
        .json({ message: `'${name}' უკვე არის ბენდის წევრი!` })
    }

    await Member.create(newMemberInfo)

    return res.status(201).json({ message: 'ბენდს წევრი წარმატებით დაემატა!' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllMembers = async (req: RequestQuery, res: Response) => {
  try {
    const allMembers = (await Member.find().select('-__v')).reverse()

    if (!req.query.page) {
      return res.status(200).json({ members: allMembers })
    }

    const membersPerPage = 3

    const totalMembers = await Member.find().countDocuments()

    const members = await Member.find()
      .select('-__v')
      .sort({ _id: -1 })
      .skip((+req.query.page - 1) * membersPerPage)
      .limit(membersPerPage)

    if (members.length === 0) {
      return res.status(200).json({
        members: [],
      })
    }

    return res.status(200).json({ members, paginationInfo: { totalMembers } })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteMember = async (req: QueryId, res: Response) => {
  try {
    const id = { _id: new mongoose.Types.ObjectId(req.query.id) }

    const member = await Member.findOne(id)

    if (!member) {
      return res.status(404).json({ message: 'წევრი ვერ მოიძებნა' })
    }

    if (member.image) {
      deleteFile(`public/${member.image}`)
    }

    await Member.deleteOne(id)
    return res.status(200).json({ message: 'ბენდის წევრი წაიშალა!' })
  } catch (error: any) {
    return res.status(500).json({ message: 'მიუთითეთ ვალიდური id-ის ფორმატი' })
  }
}

export const getOneMember = async (req: QueryId, res: Response) => {
  try {
    const { id } = req.query
    const currentMember = await Member.findById(id).select('-__v')

    if (!currentMember) {
      return res.status(404).json({ message: 'ბენდის წევრი ვერ მოიძებნა!' })
    }

    return res.status(200).json(currentMember)
  } catch (error) {
    return res.status(422).json({ message: 'წევრის id არ არის ვალიდური' })
  }
}

export const changeMember = async (
  req: RequestBody<ChangeMemberBody>,
  res: Response
) => {
  try {
    const { id, name, instrument, color, biography, orbitLength } = req.body

    const member: MemberModel = await Member.findById(
      new mongoose.Types.ObjectId(id)
    ).select('-__v')

    if (!member) {
      return res.status(404).json({
        message: 'წევრი ვერ მოიძებნა',
      })
    }

    member.orbitLength = orbitLength
    member.instrument = instrument
    member.biography = biography
    member.color = color
    member.name = name

    await member.save()
    return res.status(200).json({ message: 'წევრის ინფორმაცია შეიცვალა!' })
  } catch (err) {
    return res
      .status(409)
      .json({ message: `'${req.body.name}' უკვე არის ბენდის წევრი!` })
  }
}

export const uploadMemberPhoto = storage(
  'members',
  Member,
  'ბენდის წევრი'
).single('image')

export const uploadImage = async (
  req: RequestBody<ImageReqBody>,
  res: Response
) => {
  try {
    const currentMember = await Member.findById(req.body.id)
    if (!currentMember) {
      return res.status(404).json({ message: 'ბენდის წევრი ვერ მოიძებნა!' })
    }

    if (req.body.fileValidationError) {
      return res.status(422).json({ message: 'ატვირთეთ მხოლოდ სურათი!' })
    }

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
