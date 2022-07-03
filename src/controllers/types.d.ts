import { NewLink, NewMember } from '../models/types'

export type UploadImageReqBody = { id: string; fileValidationError?: string }

export type ImageReqBody = { id: string; fileValidationError: string }

export type MemberModel = mongoose.Model<NewMember>

export type LinkModel = mongoose.Model<NewLink>

export type File = { mimetype: string }

export type AuthResponseBody = AuthBody

export type AuthRequestBody = AuthBody

type AuthBody = {
  username: string
  password: string
}

export type Id = {
  id: string
}

export type RequestQuery = {
  query: {
    page: string
  }
}

export type AddMemberBody = {
  orbitLength: number
  instrument: string
  biography: string
  color: string
  name: string
}

export type ChangeMemberBody = {
  orbitLength: number
  instrument: string
  biography: string
  color: string
  name: string
  id: string
}

export type LinkReqBody = {
  linkName: string
  url: string
}

export type ChangeLinkReqBody = {
  linkName: string
  url: string
  id: string
}

export type ChangeBand = {
  about: string
  id: string
}
