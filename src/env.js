// @flow

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = Number(process.env.PORT) || 3005;

export const SECRET = process.env.SECRET || 'jangoBongo';


export const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://postgres@localhost:5432/testblogapi';


export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';

export const SENTRY_DSN = process.env.SENTRY_DSN || 'https://a49bdceecbdc4f24ba67c38d5a95c32b@sentry.io/1292725';
