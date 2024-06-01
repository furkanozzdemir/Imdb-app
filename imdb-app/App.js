import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import SearchMovie from "./screens/SearchMovie";
import store from "./redux/Store";
import { Provider } from "react-redux";
import FavoriteMovies from "./screens/favorite";
import DailyList from "./screens/DailyList";
import MovieDetail from "./screens/MovieDetail";
import MyTabs from "./navigation/TabNavigator";
import GenreList from "./screens/GenreList";
import MainNavigator from "./navigation/MainNavigator";
export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
