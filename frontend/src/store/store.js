import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/category";
import productReducer from "./features/product";
import cartReducer from "./features/cart";

/**
 * this will generate this structure, accessible by state.category.xyz
 * {
 *   category: { categories: [] },
 *   product: { products: [] },
 *   cart: { cart: [] },
 * }
 *
 *
 * so essentially, at some point we call dispatch(loadProducts(data)), this then lands here
 * then we try all the reducers and realise hey, the one that fits is product, so we go into
 * feature store and go to loadProducts action that was created at add slice
 */
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
