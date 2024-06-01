import { createSlice } from "@reduxjs/toolkit";

export const dailySlice = createSlice({
  name: "daily",
  initialState: {
    nowPlaying: [],
    topRated: [],
    popular: [],
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
  },
});
export const { setNowPlaying, setTopRated, setPopular } = dailySlice.actions;
export default dailySlice.reducer;
