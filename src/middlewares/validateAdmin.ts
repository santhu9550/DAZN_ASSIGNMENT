/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import ApiError from '../utils/ApiError';

const validateAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED'));
  }

  return next();
};

export default validateAdmin;
