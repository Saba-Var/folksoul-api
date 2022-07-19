import { NewMember, BandModel, NewLink } from 'models/types'
import express from 'express'
import multer from 'multer'

type BandModelType = mongoose.Model<BandModel>

type MemberModel = mongoose.Model<NewMember>

type LinkModel = mongoose.Model<NewLink>

export type Callback = (param1: null, param2: boolean, param3?: string) => void

export type StorageFunction = (location: string) => multer.StorageEngine

export type Model = MemberModel | BandModelType | LinkModel

export type FilterReq = express.Request<Record<string, {}>>

export type File = { mimetype: string }

export type Storage = (
  storageName: string,
  model: Model,
  title: string
) => multer.Multer
