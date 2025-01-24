import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../hooks/cartReducer"

const store = configureStore({
    reducer: {
        cart: cartReducer, // Add your cart reducer here
    },
});

export default store;
