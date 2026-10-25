import { createSlice } from "@reduxjs/toolkit";

const initState = {
  loading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = commonSlice.actions;
export default commonSlice.reducer;
