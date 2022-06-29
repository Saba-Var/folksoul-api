import { Response } from '../types'
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
