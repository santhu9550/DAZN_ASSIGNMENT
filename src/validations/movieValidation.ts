import Joi from '@hapi/joi';

const movieValidators = {
  listAllMovies: Joi.object({}),
  deleteMovie: Joi.object({}),
  searchMovies: Joi.object({
    query: Joi.object().keys({ q: Joi.string().required() }),
  }),
  createMovie: Joi.object({
    body: Joi.object().keys({
      title: Joi.string().required(),
      genre: Joi.string().required(),
      rating: Joi.number().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  editMovie: Joi.object({
    body: Joi.object().keys({
      title: Joi.string(),
      genre: Joi.string(),
      rating: Joi.number(),
      link: Joi.string(),
      image: Joi.string(),
    }),
  }),
};

export default movieValidators;
