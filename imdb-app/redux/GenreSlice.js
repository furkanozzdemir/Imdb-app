import { createSlice } from "@reduxjs/toolkit";

export const selectedItemSlice = createSlice({
  name: "selectedItem",
  initialState: {
    id: null,
    name: null,
  },
  reducers: {
    selectItem: (state, action) => {
      state.id = action.payload;
    },
    selectName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { selectItem, selectName } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;
