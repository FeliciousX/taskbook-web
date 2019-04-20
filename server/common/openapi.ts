import path from 'path'
import express from 'express'
import { OpenApiValidator } from 'express-openapi-validator'

import { Application } from 'express'

/**
 * OpenApiValidatorSingleton
 *
 * created because in test, running OpenApiValidator more than once will
 * cause an unexpected error.. and I can't seem to figure out a way around it
 */
class OpenApiValidatorSingleton {
  public validator
  public apiSpecPath: string

  constructor() {
    this.apiSpecPath = path.join(__dirname, 'api.yml')

    // NOTE: running this more than once will error
    this.validator = new OpenApiValidator({
      apiSpecPath: this.apiSpecPath
    })
  }

  public install(app: Application): Application {
    app.use(
      process.env.OPENAPI_SPEC || '/spec',
      express.static(this.apiSpecPath)
    )
    this.validator.install(app)

    return app
  }
}

export default new OpenApiValidatorSingleton()
