import { createSlice } from "@reduxjs/toolkit";

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: { movie: null },
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { setMovie } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
