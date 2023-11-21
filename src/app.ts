import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import router from './routes';
import error from './middlewares/error';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import users from './users/users';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

passport.use(
  new BasicStrategy((username: string, password: string, done: any) => {
    if (username in users && users[username]['pass'] == password) {
      return done(null, { username, role: users[username]['role'] });
    } else {
      return done(null, false, {
        message: 'Unauthorized - Incorrect username or password',
      });
    }
  }),
);

app.use(passport.initialize());

// api routes
app.use('/api', passport.authenticate('basic', { session: false }), router);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(error.errorConverter);

// handle error
app.use(error.errorHandler);

export default app;
