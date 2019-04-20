import { task } from 'fp-ts/lib/Task'

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { logHandler } from './logger'

import openApiValidator from './openapi'
import { errorHandler } from './error.handler'

import { Application } from 'express'
import { Task } from 'fp-ts/lib/Task'

export function registerMiddlewares(app: Application): Task<Application> {
  return task
    .of(app)
    .ap(task.of(jsonRequestHandler))
    .ap(task.of(urlencodedRequestHandler))
    .ap(task.of(cookieParserHandler))
    .ap(task.of(staticDirectoryHandler))
    .ap(task.of(logHandler))
    .ap(task.of(openApiValidator.install.bind(openApiValidator)))
    .ap(task.of(errorHandler))
}

function staticDirectoryHandler(app: Application): Application {
  const root = path.normalize(__dirname + '/../..')
  app.use(express.static(root + '/public'))
  return app
}

function jsonRequestHandler(app: Application): Application {
  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }))
  return app
}

function urlencodedRequestHandler(app: Application): Application {
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: process.env.REQUEST_LIMIT || '100kb'
    })
  )
  return app
}

function cookieParserHandler(app: Application): Application {
  app.use(cookieParser(process.env.SESSION_SECRET))
  return app
}
