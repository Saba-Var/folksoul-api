import { Response, RequestBody } from '../types'
import { LinkReqBody, Id, ChangeLinkReqBody } from './types'
import deleteFile from '../util/file'
import Link from '../models/Link'
import mongoose from 'mongoose'

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
    return res.status(500).json({ message: error.message })
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
