export type AuthRequestBody = {
  username: string
  password: string
}

export type AuthResponseBody = {
  username: string
  password: string
}

export type AddMemberBody = {
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
}
