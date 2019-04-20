import { Request, Response, NextFunction, Application } from 'express'

function errorHandlerMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = err.errors || [{ message: err.message }]
  res.status(err.status || 500).json({ errors })
}

export function errorHandler(app: Application): Application {
  app.use(errorHandlerMiddleware)
  return app
}
