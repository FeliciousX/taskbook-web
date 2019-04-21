import express from 'express'
import { create, all, byId } from './controller'
export const examplesRouter = express
  .Router()
  .post('/', create)
  .get('/', all)
  .get('/:id', byId)
