export type NewUser = {
  username: string
  password: string
}

export type NewLink = {
  linkName: string
  url: string
  image?: string
}

export type NewMember = {
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
  image?: string
}

export type Band = {
  about: string
  image?: string
}
