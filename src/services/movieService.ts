/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import Movies from '../models/movieModel';
import { clearCache, getCache, setCache } from '../cache/cache';

const createMovie = async (movieBody: any) => {
  const movie = await Movies.create(movieBody);
  clearCache();
  return movie;
};

const editMovie = async (id: string, movieBody: any) => {
  const existingMovie: any = await Movies.findById(id).exec();
  if (!existingMovie)
    throw new ApiError(httpStatus.NOT_FOUND, 'No Movie Found, Update Failed');
  delete existingMovie.id;
  const movie = await Movies.findByIdAndUpdate(id, {
    ...existingMovie,
    ...movieBody,
  });
  clearCache();
  return 'Record Update';
};

const listMovies = async (query: any = null) => {
  let filter: any = {};
  if (query && 'q' in query && query.q.length) {
    filter = {
      $or: [{ title: query?.q }, { genre: query?.q }],
    };
  }
  //get Fom Cache
  const cacheKey = JSON.stringify(filter);
  const cachedMovies = getCache(cacheKey);
  if (cachedMovies) {
    console.log('Result from Cache');
    return cachedMovies;
  }
  const movies = await Movies.find(filter).exec();
  if (!movies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Movies');
  }
  setCache(cacheKey, movies);
  console.log('Result from DB');
  return movies;
};

const deleteMovie = async (id: string) => {
  await Movies.findByIdAndDelete(id);
  clearCache();
  return 'Record Deleetd';
};

export { listMovies, createMovie, editMovie, deleteMovie };
