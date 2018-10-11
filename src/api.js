// @flow

import { join } from 'path';
import express from 'express';
import flash from 'express-flash';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import history from 'express-history-api-fallback';
import Raven from 'raven';
import chalk from 'chalk';

import passport from './core/passport';
import { client } from './core/redis';

import routes from './rest';
import authRoutes from './auth';


import relational from './relational';

import { PORT, HOST, SECRET, SENTRY_DSN } from './env';

const app = express();

if (process.env.NODE_ENV === 'production') Raven.config(SENTRY_DSN).install();

/**
 * @name middleware-functions
 */
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new (connectRedis(session))({ client }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


/**
 * @name REST
 */
app.use('/auth', authRoutes);
app.use('/api', routes);


/**
 * @name static-files
 */

const root = join(__dirname, '../public');

// serve static
app.use(express.static(root));

// spa friendly
app.use(history('index.html', { root }));


/**
 * @name api-server
 */
const server = app.listen(PORT, () => {
  console.log(chalk.hex('#009688')(' [*] App: Bootstrap Succeeded.'));
  console.log(chalk.hex('#009688')(` [*] Host: http://${HOST}:${PORT}/.`));
});

/**
 * @name Relational
 */
relational.sequelize
  .authenticate()
  .then(() => console.log(chalk.hex('#009688')(' [*] Postgres: Connection Succeeded.')))
  .catch(err => console.error(err));

export default server;
