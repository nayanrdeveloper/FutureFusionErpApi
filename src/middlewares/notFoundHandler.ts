import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../utils/errorMessages';
import { STATUS_CODES } from '../utils/statusCodes';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(ERROR_MESSAGES.NOT_FOUND(req.originalUrl));
  res.status(STATUS_CODES.NOT_FOUND);
  next(error);
};
