import mongoose, { Schema } from 'mongoose';
import { IProduct } from './types/productType';

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    skuCode: { type: String, required: true },
    barcode: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
