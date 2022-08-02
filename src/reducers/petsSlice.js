import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pets",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { add } = petsSlice.actions;
export default petsSlice.reducer;
