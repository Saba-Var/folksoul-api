import { StorageFunction, FilterReq, Callback, Model, File } from 'utils/types'
import deleteFile from 'utils/deleteFile'
import multer from 'multer'
import fs from 'fs'

export const multerStorage: StorageFunction = (location: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _res, cb) => {
      cb(null, `public/images/${location}`)
    },

    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1]
      cb(null, `${req.body.id}-${new Date().toISOString()}.${ext}`)
    },
  })

  return storage
}

export const multerFilter = (model: Model, text: string) => {
  const filter = async (req: FilterReq, file: File, cb: Callback) => {
    try {
      if (req.body.id.length !== 24) {
        req.body.fileValidationError = 'id უნდა შეიცავდეს 24 სიმბოლოს'
        return cb(null, false, req.body.fileValidationError)
      }

      const currentDoc = await model.findById(req.body.id)
      if (!currentDoc) {
        req.body.fileValidationError = `${text} ვერ მოიძებნა`
        return cb(null, false, req.body.fileValidationError)
      }

      if (file.mimetype.startsWith('image') && currentDoc) {
        if (fs.existsSync(`public/${currentDoc?.image}`) && currentDoc.image) {
          deleteFile(`public/${currentDoc?.image}`)
        }

        cb(null, true)
      }

      if (!file.mimetype.startsWith('image')) {
        req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!'
        return cb(null, false, req.body.fileValidationError)
      }
    } catch (error: any) {
      return (req.body.fileValidationError = 'სურათი ვერ აიტვირთა!')
    }
  }

  return filter
}
