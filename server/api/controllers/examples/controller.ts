import ExamplesService from '../../services/examples.service'
import { RequestHandler } from 'express'

export const all: RequestHandler = (req, res, next) => {
  ExamplesService.all().then(r => res.json(r))
}

export const byId: RequestHandler = (req, res, next) => {
  ExamplesService.byId(req.params.id).then(r => {
    if (r) res.json(r)
    else res.status(404).end()
  })
}

export const create: RequestHandler = (req, res, next) => {
  ExamplesService.create(req.body.name).then(r =>
    res
      .status(201)
      .location(`/api/v1/examples/${r.id}`)
      .json(r)
  )
}
