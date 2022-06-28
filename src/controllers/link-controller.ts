import { Response, RequestBody } from '../types'
import { LinkReqBody } from './types'
import Link from '../models/Link'

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
