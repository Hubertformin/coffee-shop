import {ProductModel} from "./product.model";

export interface CartModel extends ProductModel {
    quantity: number;
    size: string;
}