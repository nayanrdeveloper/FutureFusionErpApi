import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../utils/errorMessages';
import { STATUS_CODES } from '../utils/statusCodes';

// Extend the Error interface to include MongoDB-specific properties
interface MongoError extends Error {
  status?: number;
  code?: number;
  keyValue?: { [key: string]: any };
}

// Type guard to check if an error is a MongoDB error
const isMongoError = (error: any): error is MongoError => {
  return error.code !== undefined && error.keyValue !== undefined;
};

export const errorHandler = (
  err: MongoError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
  }

  if (isMongoError(err) && err.code === 11000) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
    message = `${ERROR_MESSAGES.DUPLICATE_KEY_ERROR(field)}`;
  }

  res.status(statusCode).json({ message });
};
