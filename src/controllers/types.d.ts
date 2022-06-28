type AuthBody = {
  username: string
  password: string
}

export type AuthRequestBody = AuthBody

export type RequestQuery = {
  query: {
    page: string
  }
}

export type AuthResponseBody = AuthBody

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

export type ImageReqBody = { id: string; fileValidationError: string }
