import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import GenreList from "../screens/GenreList";
import MovieDetail from "../screens/MovieDetail";

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="stack"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="genre"
          component={GenreList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detail"
          component={MovieDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
