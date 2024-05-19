import { body } from 'express-validator';

export const validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than zero'),
];
