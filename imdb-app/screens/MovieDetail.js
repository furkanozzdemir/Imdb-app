import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { addFavorite } from "../redux/FavoriteSlice";
function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState(null);
  const selectMovie = useSelector((state) => state.movieDetail.movie);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function addFavorites() {
    dispatch(addFavorite(movieDetail));
    ToastAndroid.show("favorilere eklendi!", ToastAndroid.SHORT);
  }
  async function getMovieDetail() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "091b8e04d5e093a2a34e64e30ce7bdda",
            query: selectMovie,
          },
        }
      );

      setMovieDetail(response.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectMovie) {
      getMovieDetail();
    }
  }, [selectMovie]);

  if (!movieDetail) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#0f0f0f",
        paddingTop: 30,
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "95%",
          height: 50,
          alignSelf: "center",
          paddingBottom: 10,
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("stack")}>
          <Ionicons name="arrow-back" size={40} color="yellow" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "90%",
          position: "relative",
          alignItems: "center",
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`,
          }}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 20,
          }}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
            textAlign: "center",
            color: "white",
          }}
        >
          {movieDetail.title}
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,

            alignItems: "center",
            justifyContent: "center",
            height: 290,
          }}
          showsVerticalScrollIndicator={true}
          indicatorStyle="yellow"
          scrollIndicatorInsets={{ right: 1 }}
        >
          <View
            style={{
              width: Dimensions.get("window").width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "88%",
                marginBottom: 8,
                color: "white",
                fontSize: 16,
                paddingBottom: 40,
                paddingLeft: 15,
                lineHeight: 20,
              }}
            >
              {movieDetail.overview}
            </Text>
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            gap: 60,

            height: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="star" size={24} color="yellow" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                paddingLeft: 15,
              }}
            >
              {movieDetail.vote_average}
            </Text>
          </View>
          <TouchableOpacity onPress={() => addFavorites()}>
            <MaterialIcons name="add-box" size={50} color="yellow" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome name="language" size={24} color="yellow" />

            <Text
              style={{
                color: "white",
                paddingBottom: 10,
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 15,
              }}
            >
              {movieDetail.original_language}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MovieDetail;
