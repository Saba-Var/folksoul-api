import { Response, RequestBody } from '../types'
import { ChangeBand } from './types'
import Band from 'models/Band'

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
    const band = await Band.findOne()

    if (band) {
      band.about = req.body.about
      await band.save()
      return res
        .status(200)
        .json({ message: 'ბენდის ინფორმაცია წარმატებით შეიცვალა!' })
    } else return res.status(404).json({ message: 'ბენდი ჯერ არ არსებობს' })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
