import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pets",
  initialState: [],
  reducers: {
    add: (state, action) => {
      return action.payload;
    },
  },
});

export const { add } = petsSlice.actions;
export default petsSlice.reducer;
