import { multerFilter, multerStorage } from 'utils/multerProperties'
import { Model } from 'utils/types'
import multer from 'multer'

const storage = (storageName: string, model: Model, title: string) => {
  return multer({
    storage: multerStorage(storageName),
    fileFilter: multerFilter(model, title),
  })
}

export default storage
