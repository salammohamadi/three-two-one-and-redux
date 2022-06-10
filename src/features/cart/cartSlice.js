import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
});

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
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true;
    },

    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },

    [getCartItems.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
