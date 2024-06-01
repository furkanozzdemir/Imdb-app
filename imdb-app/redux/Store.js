import { configureStore } from "@reduxjs/toolkit";
import moviedetail from "./MovieSlice";
import selectedItemReducer from "./GenreSlice";
import favorite from "./FavoriteSlice";
const store = configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
    movieDetail: moviedetail,
    favorites: favorite,
  },
});
export default store;
