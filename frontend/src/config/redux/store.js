import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import productReducer from "./reducers/productReducer"
import cartReducer from "./reducers/cartReducer";
import contactReducer from './reducers/contactReducer';
import orderReducer from "./reducers/orderReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        contact: contactReducer,
        order: orderReducer,
    }
})