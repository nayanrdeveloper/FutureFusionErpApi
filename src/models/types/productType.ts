import { Document } from "mongoose"; 

export interface IProduct extends Document{
    name: string;
    price: string;
    skuCode: string;
    barcode: string;
}