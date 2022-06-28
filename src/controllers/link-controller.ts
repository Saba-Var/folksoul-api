import { LinkReqBody, Id, ChangeLinkReqBody, File } from './types'
import { Response, RequestBody } from '../types'
import deleteFile from '../util/file'
import Link from '../models/Link'
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'

export const getAllLinks = async (_req: {}, res: Response) => {
  try {
    const links = await Link.find().select('-__v')
    if (links.length === 0) return res.status(200).json([])

    return res.status(200).json(links)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const addLink = async (req: RequestBody<LinkReqBody>, res: Response) => {
  try {
    const { linkName, url } = req.body

    const existingLink = await Link.findOne({ linkName })

    if (existingLink)
      return res
        .status(400)
        .json({ message: `სოციალური ბმული '${linkName}' უკვე არსებობს` })

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

export const deleteLink = async (req: RequestBody<Id>, res: Response) => {
  try {
    const id = { _id: new mongoose.Types.ObjectId(req.body.id) }

    const link = await Link.findOne(id)

    if (!link)
      return res.status(404).json({ message: 'სოციალური ბმული ვერ მოიძებნა' })

    if (link.image) deleteFile(`public/${link.image}`)

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

    const link: any = await Link.findById(
      new mongoose.Types.ObjectId(id)
    ).select('-__v')

    if (!link)
      return res.status(404).json({
        message: 'სოციალური ბმული ვერ მოიძებნა',
      })

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

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/images/social-links')
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${req.body.id}-${new Date().toISOString()}.${ext}`)
  },
})

const multerFilter = async (req: any, file: File, cb: any) => {
  try {
    if (req.body.id.length !== 24) {
      req.body.fileValidationError = 'id უნდა შეიცავდეს 24 სიმბოლოს'
      return cb(null, false, req.fileValidationError)
    }

    const currentLink = await Link.findById(req.body.id)
    if (!currentLink) {
      req.body.fileValidationError = 'სოციალური ბმული ვერ მოიძებნა'
      return cb(null, false, req.fileValidationError)
    }

    if (file.mimetype.startsWith('image') && currentLink) {
      if (fs.existsSync(`public/${currentLink?.image}`) && currentLink.image)
        deleteFile(`public/${currentLink?.image}`)

      cb(null, true)
    }

    if (!file.mimetype.startsWith('image')) {
      req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!'
      return cb(null, false, req.fileValidationError)
    }
  } catch (error: any) {
    req.body.fileValidationError = 'სურათი ვერ აიტვირთა!'
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

export const uploadLinkPhoto = upload.single('image')

export const uploadImage = async (req: RequestBody<any>, res: Response) => {
  try {
    const currentLink = await Link.findById(req.body.id)
    if (!currentLink)
      return res.status(404).json({ message: 'სოციალური ბმული ვერ მოიძებნა' })

    if (req.body.fileValidationError)
      return res.status(422).json({ message: 'ატვირთეთ მხოლოდ სურათი!' })

    if (req.file) {
      currentLink.image = req.file.path.substring(7)
      await currentLink.save()
      return res.status(201).json({
        message: 'სოციალური ბმული წარმატებით აიტვირთა',
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
