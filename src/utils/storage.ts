import { multerFilter, multerStorage } from 'utils/multerProperties'
import { Member, Band, Link } from 'models'
import { Storage } from 'utils/types'
import multer from 'multer'

const storage: Storage = (storageName, model, title) => {
  return multer({
    storage: multerStorage(storageName),
    fileFilter: multerFilter(model, title),
  })
}

export const uploadBandPhoto = storage('band', Band, 'ბენდი').single('image')

export const uploadMemberPhoto = storage(
  'members',
  Member,
  'ბენდის წევრი'
).single('image')

export const uploadLinkPhoto = storage(
  'social-links',
  Link,
  'სოციალური ბმული'
).single('image')

export default storage
