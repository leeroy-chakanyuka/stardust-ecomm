import { createSlice } from "@reduxjs/toolkit";

export const initState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    loadCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
  },
});

export const { loadCategories } = categorySlice.actions;
export default categorySlice.reducer;
