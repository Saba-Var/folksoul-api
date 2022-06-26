type AuthBody = {
  username: string
  password: string
}

export type AuthRequestBody = AuthBody

export type AuthResponseBody = AuthBody

export type AddMemberBody = {
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
}

export type changeMemberBody = {
  id: string
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
}
