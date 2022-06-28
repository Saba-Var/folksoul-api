import { Response } from '../types'

export type ValidateResult = {
  errors: []
}

export type ValidateResultReq = { body: {} }

export type AuthResponse = {
  message: string
}

export type AuthReqBody = {
  headers: {
    authorization: string
  }
}

export type HeaderType = { authorization: 'string' }
