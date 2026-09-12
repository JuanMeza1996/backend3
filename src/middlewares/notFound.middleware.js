import {
  AppError
} from '../errors/AppError.js';

import {
  ErrorDictionary
} from '../constants/errorDictionary.js';

export const notFoundMiddleware = (
  req,
  res,
  next
) => {
  next(
    new AppError(
      ErrorDictionary.ROUTE_NOT_FOUND
    )
  );
};