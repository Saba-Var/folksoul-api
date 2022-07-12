import { multerFilter, multerStorage } from 'utils/multerProperties'
import multer from 'multer'

const storage = (storageName: string, model: any, title: string) => {
  return multer({
    storage: multerStorage(storageName),
    fileFilter: multerFilter(model, title),
  })
}

export default storage
