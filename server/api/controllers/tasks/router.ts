import express from 'express'
import { all } from './controller'

export const tasksRouter = express.Router().get('/', all)
