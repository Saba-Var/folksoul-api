export interface RequestBody<ReqBody> extends Express.Request {
  body: ReqBody
}

type JsonType = Send<ResBody, this>

export interface Response<ResBody> extends Express.Response {
  status: (number: number) => { json: JsonType }
  json: JsonType
}
