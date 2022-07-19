import { Response } from 'types'

export type HeaderType = { authorization: 'string' }

export type ValidateResultReq = { body: {} }

export type ValidateResult = {
  errors: []
}

export type AuthResponse = {
  message: string
}

export type AuthReqBody = {
  headers: {
    authorization: string
  }
}

export type AuthBody = {
  url: string
  headers: {
    authorization: string
  }
}

export type ValidateWords = {
  instrument: string
  name: string
  biography: string
}
