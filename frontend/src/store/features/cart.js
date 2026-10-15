import { createSlice } from "@reduxjs/toolkit";

export const initState = {
  cart: [],
};

// Shared local state, such as a user's cart, also belongs in Redux
export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    // dispatch(addToCart(item)) makes Redux run this handler with item as the payload.
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      return state;
    },
    loadCart: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      };
    },
  },
});

export const { addToCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
