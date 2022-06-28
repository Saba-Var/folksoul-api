import Link from '../models/Link'

export const addLink = async (req: any, res: any) => {
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
      .send({ message: 'სოციალური ბმული წარმატებით შეინახა!' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
