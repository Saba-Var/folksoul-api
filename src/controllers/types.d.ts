type AuthBody = {
  username: string
  password: string
}

export type AuthRequestBody = AuthBody

export type AuthResponseBody = AuthBody

export type ImageReqBody = { id: string; fileValidationError: string }

export type RequestQuery = {
  query: {
    page: string
  }
}

export type AddMemberBody = {
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
}

export type ChangeMemberBody = {
  id: string
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
}

export type Id = {
  id: string
}

export type LinkReqBody = {
  linkName: string
  url: string
}

export type ChangeLinkReqBody = {
  id: string
  linkName: string
  url: string
}

export type File = { mimetype: string }
