import { multerStorage } from '../util/multerProperties'
import { Response, RequestBody } from '../types'
import deleteFile from '../util/deleteFile'
import { ChangeBand } from './types'
import mongoose from 'mongoose'
import Band from 'models/Band'
import { File } from './types'
import multer from 'multer'
import fs from 'fs'

export const getBandAbout = async (_req: {}, res: Response) => {
  try {
    let existingBand = await Band.find()
    if (existingBand.length === 0)
      await Band.create({
        about: 'ბენდის შესახებ ინფორმაცია არ არის დამატებული',
      })

    return res.status(200).json(await Band.find().select('-__v'))
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const changeBandAbout = async (
  req: RequestBody<ChangeBand>,
  res: Response
) => {
  try {
    const id = { _id: new mongoose.Types.ObjectId(req.body.id) }
    const band = await Band.findOne(id)

    if (!band) return res.status(404).json({ message: 'ბენდი ჯერ არ არსებობს' })

    band.about = req.body.about
    await band.save()

    return res
      .status(200)
      .json({ message: 'ბენდის ინფორმაცია წარმატებით შეიცვალა!' })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

const multerFilter = async (req: any, file: File, cb: any) => {
  try {
    const band = await Band.findOne()
    if (!band) {
      req.body.fileValidationError = `ბენდი ვერ მოიძებნა`
      return cb(null, false, req.fileValidationError)
    }

    if (file.mimetype.startsWith('image') && band) {
      if (fs.existsSync(`public/${band?.image}`) && band.image)
        deleteFile(`public/${band?.image}`)

      cb(null, true)
    }

    if (!file.mimetype.startsWith('image')) {
      req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!'
      return cb(null, false, req.fileValidationError)
    }
  } catch (error: any) {
    return (req.body.fileValidationError = 'სურათი ვერ აიტვირთა!')
  }
}

const upload = multer({
  storage: multerStorage('band'),
  fileFilter: multerFilter,
})

export const uploadBandPhoto = upload.single('image')

export const uploadImage = async (req: RequestBody<any>, res: Response) => {
  try {
    const band = await Band.findOne()
    if (!band) return res.status(404).json({ message: 'ბენდი ვერ მოიძებნა' })

    if (req.body.fileValidationError)
      return res.status(422).json({ message: 'ატვირთეთ მხოლოდ სურათი!' })

    if (req.file) {
      band.image = req.file.path.substring(7)
      await band.save()
      return res.status(201).json({
        message: 'ბენდის სურათი წარმატებით აიტვირთა',
      })
    } else return res.status(422).json({ message: 'ატვირთეთ ბენდის სურათი' })
  } catch (error: any) {
    return res.status(500).json({ message: error })
  }
}
