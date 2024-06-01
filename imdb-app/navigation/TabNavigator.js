import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyList from "../screens/DailyList";
import SearchMovie from "../screens/SearchMovie";
import favorite from "../screens/favorite";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
const Tab = createBottomTabNavigator();

function MyTabs() {
  const select = useSelector((state) => state.favorites);
  const length = select.length;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "black",
          borderTopWidth: 0,
          justifyContent: "center",
          height: 40,
          paddingTop: 5,
        },
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        name="Home"
        component={DailyList}
        options={{
          headerShown: false,

          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={25} color="yellow" />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchMovie}
        options={{
          headerShown: false,

          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={25} color="yellow" />
          ),
        }}
      />
      <Tab.Screen
        name="favorite"
        component={favorite}
        options={{
          headerShown: false,
          tabBarBadge: length,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={25} color="yellow" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
