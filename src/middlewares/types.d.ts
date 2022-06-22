import { Response } from '../types'

export type ValidateResult = {
  errors: []
}

export type ValidateResultReq = { body: {} }

export type AuthResponse = {
  message: string
}

export type HeaderType = { authorization: 'string' }
