import { Response, RequestBody } from 'types'
import { deleteFile } from 'utils'
import mongoose from 'mongoose'
import { Link } from 'models'
import {
  UploadImageReqBody,
  ChangeLinkReqBody,
  LinkReqBody,
  LinkModel,
  QueryId,
} from 'controllers'

export const getAllLinks = async (_: {}, res: Response) => {
  try {
    const links = await Link.find().select('-__v')
    if (links.length === 0) {
      return res.status(200).json([])
    }

    return res.status(200).json(links)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const addLink = async (req: RequestBody<LinkReqBody>, res: Response) => {
  try {
    const { linkName, url } = req.body

    const existingLink = await Link.findOne({ linkName })

    if (existingLink) {
      return res
        .status(409)
        .json({ message: `სოციალური ბმული '${linkName}' უკვე არსებობს` })
    }

    await Link.create({
      linkName,
      url,
    })

    return res
      .status(201)
      .json({ message: 'სოციალური ბმული წარმატებით შეინახა!' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteLink = async (req: QueryId, res: Response) => {
  try {
    const id = { _id: new mongoose.Types.ObjectId(req.query.id) }

    const link = await Link.findOne(id)

    if (!link) {
      return res.status(404).json({ message: 'სოციალური ბმული ვერ მოიძებნა' })
    }

    if (link.image) {
      deleteFile(`public/${link.image}`)
    }

    await Link.deleteOne(id)
    return res.status(200).json({ message: 'სოციალური ბმული წაიშალა!' })
  } catch (error: any) {
    return res.status(500).json({ message: 'მიუთითეთ ვალიდური id-ის ფორმატი' })
  }
}

export const changeLink = async (
  req: RequestBody<ChangeLinkReqBody>,
  res: Response
) => {
  try {
    const { id, linkName, url } = req.body

    const link: LinkModel = await Link.findById(
      new mongoose.Types.ObjectId(id)
    ).select('-__v')

    if (!link) {
      return res.status(404).json({
        message: 'სოციალური ბმული ვერ მოიძებნა',
      })
    }

    link.linkName = linkName
    link.url = url

    await link.save()
    return res
      .status(200)
      .json({ message: 'სოციალური ბმულის ინფორმაცია შეიცვალა' })
  } catch (err) {
    return res
      .status(409)
      .json({ message: `'${req.body.linkName}' უკვე დამატებულია!` })
  }
}

export const uploadImage = async (
  req: RequestBody<UploadImageReqBody>,
  res: Response
) => {
  try {
    const currentLink = await Link.findById(req.body.id)

    if (!currentLink) {
      return res.status(404).json({ message: 'სოციალური ბმული ვერ მოიძებნა' })
    }

    if (req.body.fileValidationError) {
      return res.status(422).json({ message: 'ატვირთეთ მხოლოდ სურათი!' })
    }

    if (req.file) {
      currentLink.image = req.file.path.substring(7)
      await currentLink.save()
      return res.status(201).json({
        message: 'სოციალური ბმულის სურათი წარმატებით აიტვირთა',
      })
    } else
      return res
        .status(422)
        .json({ message: 'ატვირთეთ სოციალური ბმულის სურათი' })
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'სოციალური ბმულის id არ არის ვალიდური' })
  }
}
