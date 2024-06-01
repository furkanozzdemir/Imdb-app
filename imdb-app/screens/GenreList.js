import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { setMovie } from "../redux/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function GenreList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function goDetail(item) {
    // console.log(item.title);
    dispatch(setMovie(item.title));
    navigation.navigate("detail");
  }
  const selectedId = useSelector((state) => state.selectedItem.id);
  const selectedName = useSelector((state) => state.selectedItem.name);
  const [genreList, setGenreList] = useState([]);
  const navigationGenre = useNavigation();

  function goBack() {
    navigationGenre.navigate("stack");
  }

  async function getGenreList() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=091b8e04d5e093a2a34e64e30ce7bdda&with_genres=${selectedId}`
    );
    setGenreList(response.data.results);
  }
  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f0f0f",

        alignItems: "center",
        paddingTop: 30,
      }}
    >
      <View
        style={{
          width: 370,
          flexDirection: "row",
          alignItems: "center",

          paddingBottom: 10,
          borderBottomWidth: 1,
          borderColor: "#f6c71f",
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={45} color="#f6c71f" />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 26,
            paddingLeft: 100,
            paddingBottom: 5,
          }}
        >
          {selectedName}
        </Text>
      </View>
      <FlatList
        data={genreList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goDetail(item)}>
            <View
              style={{
                width: 380,
                height: 250,

                borderWidth: 1,
                borderRadius: 20,
                overflow: "hidden",

                backgroundColor: "#242424",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  width: 150,
                  height: 250,
                  borderWidth: 1,
                }}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                  }}
                  style={{ width: "100%", height: 250 }}
                  resizeMode="stretch"
                />
              </View>

              <View
                style={{
                  flex: 1,
                  width: 230,
                  alignItems: "center",
                  justifyContent: "space-around",
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
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default GenreList;
