export interface RequestBody<ReqBody> extends Express.Request {
  body: ReqBody
}

type JsonType = Send<{ message: string }, this>

export interface Response extends Express.Response {
  status: (number: number) => { json: JsonType }
  json: JsonType
}

export type Next = () => void
