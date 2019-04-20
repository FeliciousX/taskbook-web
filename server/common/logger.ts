import pino from 'pino';

export const log = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});
