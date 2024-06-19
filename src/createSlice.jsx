import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalCost: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { name, image, description, cost } = action.payload;
            const newItem = {
                name,
                image,
                description,
                cost,
                quantity: 1
            };
            state.cartItems.push(newItem);
            state.totalQuantity++;
            state.totalCost += parseInt(cost.replace('$', ''), 10);
        },
        removeItem: (state, action) => {
            const { name } = action.payload;
            state.cartItems = state.cartItems.filter(item => item.name !== name);
            state.totalQuantity--;
            state.totalCost -= parseInt(action.payload.cost.replace('$', ''), 10);
        },
        incrementQuantity: (state, action) => {
            const { name } = action.payload;
            const item = state.cartItems.find(item => item.name === name);
            if (item) {
                item.quantity++;
                state.totalQuantity++;
                state.totalCost += parseInt(item.cost.replace('$', ''), 10);
            }
        },
        decrementQuantity: (state, action) => {
            const { name } = action.payload;
            const item = state.cartItems.find(item => item.name === name);
            if (item && item.quantity > 1) {
                item.quantity--;
                state.totalQuantity--;
                state.totalCost -= parseInt(item.cost.replace('$', ''), 10);
            } else if (item && item.quantity === 1) {
                state.totalQuantity--;
                state.totalCost -= parseInt(item.cost.replace('$', ''), 10);
                state.cartItems = state.cartItems.filter(item => item.name !== name);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalCost = 0;
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
