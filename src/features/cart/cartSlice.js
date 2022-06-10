import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
      state.amount = 0;
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    },

    increase: (state, action) => {
      state.cartItems.forEach(item => {
        if (item.id === action.payload) {
          item.amount++;
        }
      });
    },

    decrease: (state, action) => {
      state.cartItems.forEach(item => {
        if (item.id === action.payload) {
          item.amount--;
        }
      });
    },

    calculateTotal: state => {
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );
      state.amount = state.cartItems.length;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
