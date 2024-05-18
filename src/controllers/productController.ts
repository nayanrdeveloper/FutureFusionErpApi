import { Request, Response } from "express";
import productModel from "../models/productModel";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, barcode, skuCode } = req.body;
  try {
    const product = new productModel({
      name,
      price,
      barcode,
      skuCode,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({message: 'Internal server error'})
  }
};
