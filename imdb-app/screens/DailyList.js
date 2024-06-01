import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setMovie } from "../redux/MovieSlice";
import { useNavigation } from "@react-navigation/native";
function DailyList() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function goDetail(item) {
    // console.log(item.title);
    dispatch(setMovie(item.title));
    navigation.navigate("detail");
  }
  const fetchAllData = async () => {
    try {
      const baseUrl = "https://api.themoviedb.org/3/movie";
      const urls = [
        `${baseUrl}/now_playing?api_key=091b8e04d5e093a2a34e64e30ce7bdda`,
        `${baseUrl}/popular?api_key=091b8e04d5e093a2a34e64e30ce7bdda`,
        `${baseUrl}/top_rated?api_key=091b8e04d5e093a2a34e64e30ce7bdda`,
      ];

      const [nowPlayingResponse, popularResponse, topRatedResponse] =
        await Promise.all(urls.map((url) => axios.get(url)));
      setNowPlaying(nowPlayingResponse.data.results);
      setTopRated(topRatedResponse.data.results);
      setPopular(popularResponse.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#0f0f0f",
        paddingTop: 30,
        paddingBottom: 20,
        gap: 20,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 10,
              alignItems: "center",
            }}
          >
            <FontAwesome name="square" size={20} color="#f6c71f" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 19,
                paddingLeft: 10,
              }}
            >
              Popular This Week
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingRight: 16 }}>
            <Text style={{ color: "#f6c71f", fontSize: 17, paddingRight: 5 }}>
              See all
            </Text>
            <Feather name="arrow-right" size={24} color="#f6c71f" />
          </View>
        </View>

        <FlatList
          data={popular}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goDetail(item)}>
              <View
                style={{
                  width: 380,
                  height: 220,

                  borderWidth: 1,
                  borderRadius: 20,
                  overflow: "hidden",
                  marginLeft: 10,
                  backgroundColor: "#242424",
                  flexDirection: "row",
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
                    style={{ height: 250 }}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
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
      <View>
        <View style={{ paddingBottom: 10, paddingLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="square" size={20} color="#f6c71f" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 19,
                paddingLeft: 10,
              }}
            >
              Now Playing
            </Text>
          </View>
        </View>
        <FlatList
          data={nowPlaying}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goDetail(item)}>
              <View
                style={{
                  width: 140,
                  height: 190,
                  borderWidth: 1,
                  borderRadius: 20,
                  overflow: "hidden",
                  marginRight: 30,
                  backgroundColor: "#f6c71f",
                }}
              >
                <View>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                    style={{
                      width: "100%",
                      height: 140,
                      marginRight: 10,
                    }}
                    resizeMode="stretch"
                  />
                </View>

                <View
                  style={{
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    paddingTop: 5,
                  }}
                >
                  <Text
                    style={{
                      width: "99%",
                      fontWeight: "bold",
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="star" size={18} color="black" />
                    <Text> {item.vote_average}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <View style={{ paddingBottom: 10, paddingLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="square" size={20} color="#f6c71f" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 19,
                paddingLeft: 10,
              }}
            >
              Top Rated
            </Text>
          </View>
        </View>
        <FlatList
          data={topRated}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goDetail(item)}>
              <View
                style={{
                  width: 140,
                  height: 200,
                  borderWidth: 1,
                  borderRadius: 20,
                  overflow: "hidden",
                  marginRight: 30,
                  backgroundColor: "#f6c71f",
                }}
              >
                <View>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                    style={{
                      width: "100%",
                      height: 145,
                      marginRight: 10,
                    }}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    paddingTop: 5,
                  }}
                >
                  <Text
                    style={{
                      width: "99%",
                      fontWeight: "bold",
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="star" size={18} color="black" />
                    <Text> {item.vote_average}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default DailyList;
