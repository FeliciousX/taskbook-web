import './common/env';

import { task } from 'fp-ts/lib/Task';

import os from 'os';
import express from 'express';

import { registerMiddlewares } from './common/server';
import { log } from './common/logger';

import { routes } from './routes';

import { Application } from 'express';

export const appTask = registerMiddlewares(express())
  .ap(task.of(routes))

if (process.env.NODE_ENV !== 'test') {
  const port = parseInt(process.env.PORT);

  appTask
    .chain(app => task.of(app.listen(port)))
    .run()
    .then(() => log.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`))
}
