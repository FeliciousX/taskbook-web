import expressPino from 'express-pino-logger'
import pino from 'pino'

import { Application } from 'express'

export const log = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  prettyPrint: {
    levelFirst: true
  }
})

export function logHandler(app: Application): Application {
  if (process.env.NODE_ENV !== 'test') {
    app.use(expressPino({ logger: log }))
  }
  return app
}
