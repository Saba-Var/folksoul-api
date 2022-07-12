import { multerStorage, multerFilter } from 'utils/multerProperties'
import { ChangeBand, ImageReqBody } from 'controllers/types'
import { Response, RequestBody } from 'types'
import mongoose from 'mongoose'
import Band from 'models/Band'
import multer from 'multer'

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

const upload = multer({
  storage: multerStorage('band'),
  fileFilter: multerFilter(Band, 'ბენდი'),
})

export const uploadBandPhoto = upload.single('image')

export const uploadImage = async (
  req: RequestBody<ImageReqBody>,
  res: Response
) => {
  try {
    const id = { _id: new mongoose.Types.ObjectId(req.body.id) }

    const band = await Band.findOne(id)

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
    return res.status(500).json({ message: error.message })
  }
}
