import {API} from "aws-amplify";
import {ProductModel} from "../models/product.model";

export function getProducts({search}: {search?: string} = {}): Promise<{data: ProductModel[]}> {
    return API.get('coffeeShopApi', '/products', {
        ...(search && {
            queryStringParameters: {
                search
            }
        })
    });
}

export function getProductById(id: string): Promise<{data: ProductModel}> {
    return API.get('coffeeShopApi', `/products/${id}`, {});
}

export function getCategories(): Promise<{data: string[]}> {
    return API.get('coffeeShopApi', '/categories', {});
}

export function addOrder(data): Promise<any> {
    return API.post('coffeeShopApi', '/orders', { body: data});
}