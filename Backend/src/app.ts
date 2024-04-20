import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { ErrorsMiddleware } from './middlewares/errors.middlewares.js';
import { AuthInterceptor } from './middlewares/auth.interceptor.js';
import { UserSqlRepository } from './repositories/users.repo/users.repo.js';
import { UserController } from './controllers/users.controllers.ts/users.controllers.js';
import { UserRouter } from './routers/users.routers/users.routers.js';

const debug = createDebug('W7*:app');

export const createApp = () => {
  debug('creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());

  const authInterceptor = new AuthInterceptor();

  const usersRepo = new UserSqlRepository(prisma);

  const usersController = new UserController(usersRepo);

  const usersRouter = new UserRouter(usersController, authInterceptor);

  app.use('/users', usersRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
