/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import catchAsync from '../utils/catchAsync';
import {
  createMovie,
  deleteMovie,
  editMovie,
  listMovies,
} from '../services/movieService';
import httpStatus from 'http-status';
import validate from '../middlewares/validate';
import movieValidators from '../validations/movieValidation';
import validateAdmin from '../middlewares/validateAdmin';
const movieRouter = express.Router();

movieRouter.get(
  '/',
  validate(movieValidators.listAllMovies),
  catchAsync(async (req: any, res: any) => {
    const movies = await listMovies();
    res.status(httpStatus.OK).json(movies);
  }),
);

movieRouter.get(
  '/search',
  validate(movieValidators.searchMovies),
  catchAsync(async (req: any, res: any) => {
    const movies = await listMovies(req.query);
    res.status(httpStatus.OK).json(movies);
  }),
);

movieRouter.post(
  '/',
  [validateAdmin, validate(movieValidators.createMovie)],
  catchAsync(async (req: any, res: any) => {
    const movies = await createMovie(req.body);
    res.status(httpStatus.OK).json(movies);
  }),
);

movieRouter.put(
  '/:id',
  [validateAdmin, validate(movieValidators.editMovie)],
  catchAsync(async (req: any, res: any) => {
    const movies = await editMovie(req.params.id, req.body);
    res.status(httpStatus.OK).json(movies);
  }),
);

movieRouter.delete(
  '/:id',
  [validateAdmin, validate(movieValidators.deleteMovie)],
  catchAsync(async (req: any, res: any) => {
    const movies = await deleteMovie(req.params.id);
    res.status(httpStatus.OK).json(movies);
  }),
);

export default movieRouter;
