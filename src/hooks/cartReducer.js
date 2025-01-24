import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    cartItems: [],
};

// Create a slice for cart management
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Action to add an item to the cart (entire object)
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItem) {
                // If the item already exists in the cart, increase quantity
                existingItem.quantity += 1;
            } else {
                // Otherwise, add the item with quantity 1
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },

        // Action to remove an item from the cart
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },

        // Action to increase the quantity of an item
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload
            );
            if (item) {
                item.quantity += 1;
            }
        },

        // Action to decrease the quantity of an item
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    },
});

// Export the actions (addToCart, removeFromCart, increaseQuantity, decreaseQuantity)
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
    cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
