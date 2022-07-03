export type NewUser = {
  username: string
  password: string
}

export type NewLink = {
  linkName: string
  image?: string
  url: string
}

export type NewMember = {
  orbitLength: number
  instrument: string
  biography: string
  image?: string
  color: string
  name: string
}

export type Band = {
  image?: string
  about: string
}
