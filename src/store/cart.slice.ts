import { createSlice } from '@reduxjs/toolkit'
import {CartModel} from "../models/cart.model";

interface CartStateModel {
    products: CartModel[]
}

const initialState: CartStateModel = {
    products: []
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToCartAction(state, action) {
            state.products.push(action.payload)
        },
        removeFromCartAction(state, action) {
            const items = state.products.filter(item => item.id !== action.payload)
            state.products = [...items]
        }
    }
})

export const { addToCartAction, removeFromCartAction } = todosSlice.actions
export default todosSlice.reducer