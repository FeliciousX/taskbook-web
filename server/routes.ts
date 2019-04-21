import { examplesRouter } from './api/controllers/examples/router'
import { tasksRouter } from './api/controllers/tasks/router'

import { Application } from 'express'

export function routes(app: Application): Application {
  app.use('/api/v1/examples', examplesRouter)
  app.use('/api/v1/tasks', tasksRouter)

  return app
}
