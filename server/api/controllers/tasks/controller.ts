import { RequestHandler } from 'express'

export const all: RequestHandler = (req, res, next) => {
  res.json([1])

  next()
}
