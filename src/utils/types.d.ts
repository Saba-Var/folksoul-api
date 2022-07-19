import { NewMember, BandModel, NewLink } from 'models/types'
import e from 'express'

type BandModelType = mongoose.Model<BandModel>

type MemberModel = mongoose.Model<NewMember>

type LinkModel = mongoose.Model<NewLink>

export type Callback = (param1: null, param2: boolean, param3?: string) => void

export type StorageFunction = (location: string) => multer.StorageEngine

export type Model = MemberModel | BandModelType | LinkModel

export type FilterReq = e.Request<Record<string, {}>>

export type File = { mimetype: string }
