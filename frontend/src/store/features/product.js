import { createSlice } from "@reduxjs/toolkit";

const initState = {
  products: [],
};

/* redux manages shared app state, ie API data and local data like a cart
 * createSlice() generates action creators - this a function that creates and returns an action Object
 */
const productSlice = createSlice({
  name: "productState",
  initialState: initState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      return state;
    },
    loadProducts: (state, action) => {
      return {
        ...state, // copy over old but add our new product array from the payload
        products: action.payload,
      };
    },
  },
});

/*
 * these are the aforementioned generated actions
 * loadProducts(data) returns { type: "productState/loadProducts", payload: data }.
 * dispatch(loadProducts(data)) sends that object to Redux, which runs the handler
 */
export const { addProduct, loadProducts } = productSlice.actions;
// store.js registers this slice reducer under state.product.
export default productSlice.reducer;
