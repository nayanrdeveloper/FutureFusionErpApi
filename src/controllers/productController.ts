import { NextFunction, Request, Response } from 'express';
import productModel from '../models/productModel';
import { STATUS_CODES } from '../utils/statusCodes';
import { queryHelper } from '../utils/queryHelper';
import logger from '../utils/logger';
import { ERROR_MESSAGES } from '../utils/errorMessages';

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

export const getProducts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const result = await queryHelper(req, productModel);
        res.status(STATUS_CODES.OK).json(result);
    } catch (error) {
        const err = error as Error;
        logger.error(`Error fetching products: ${err.message}`);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};
