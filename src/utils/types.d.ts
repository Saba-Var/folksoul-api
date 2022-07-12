export type Callback = (param1: null, param2: boolean, param3?: string) => void

export type File = { mimetype: string }

export type FilterReqBody = {
  body: {
    id: string
    fileValidationError: string
  }
  fileValidationError: string
}
