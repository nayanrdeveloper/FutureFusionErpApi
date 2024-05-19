import { NextFunction, Request, Response } from 'express';
import productModel from '../models/productModel';
import { STATUS_CODES } from '../utils/statusCodes';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price, barcode, skuCode } = req.body;
  try {
    const product = new productModel({
      name,
      price,
      barcode,
      skuCode,
    });
    const savedProduct = await product.save();
    res.status(STATUS_CODES.CREATED).json(savedProduct);
  } catch (error) {
    next(error);
  }
};
