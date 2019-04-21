import { examplesRouter } from './api/controllers/examples/router'

import { Application } from 'express'

export function routes(app: Application): Application {
  app.use('/api/v1/examples', examplesRouter)
  return app
}
