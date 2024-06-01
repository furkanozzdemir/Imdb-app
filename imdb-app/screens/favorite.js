import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../redux/FavoriteSlice";
function FavoriteMovies() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: "#0f0f0f",
      }}
    >
      <View style={{ paddingBottom: 20 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
          FAVORİTES
        </Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              width: 380,
              height: 300,

              borderWidth: 1,
              borderColor: "yellow",
              borderRadius: 20,
              overflow: "hidden",

              backgroundColor: "#242424",
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: 170,
                height: 250,
                borderWidth: 1,
                position: "relative",
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                style={{ width: "100%", height: 300 }}
                resizeMode="stretch"
              />
            </View>

            <View
              style={{
                flex: 1,
                width: 230,
                alignItems: "center",
                justifyContent: "space-around",
                position: "relative",
              }}
            >
              <Text
                style={{
                  width: "90%",
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  width: "95%",
                  textAlign: "center",
                  color: "white",
                  fontSize: 12,
                  lineHeight: 19,
                }}
                numberOfLines={7}
                ellipsizeMode="tail"
              >
                {item.overview}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  color: "white",

                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                POPULARİTY: {item.popularity}
              </Text>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => dispatch(removeFavorite(item))}
                >
                  <MaterialCommunityIcons
                    name="bookmark-remove"
                    size={40}
                    color="yellow"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default FavoriteMovies;
