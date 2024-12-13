import { createSlice } from '@reduxjs/toolkit';
import Swal from "sweetalert2";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item quantity updated in the cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item added to the cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Item removed from the cart",
                showConfirmButton: false,
                timer: 1500
            });
        },
        clearCart(state) {
            state.cartItems = [];
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Cart cleared",
                showConfirmButton: false,
                timer: 1500
            });
        },
        increaseQuantity(state, action) {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity(state, action) {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
