import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectItem, selectName } from "../redux/GenreSlice";
import { useNavigation } from "@react-navigation/native";
import GenreList from "./GenreList";
function SearchMovie() {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [closeCategory, setCloseCategory] = useState(false);
  const navigation = useNavigation();
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
  ];

  function goDetailPage(item) {
    dispatch(selectItem(item.id));
    dispatch(selectName(item.name));
    navigation.navigate("genre");
  }
  async function fetchData() {
    if (movie.length == "") {
      alert("enter a movie");
    } else
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "091b8e04d5e093a2a34e64e30ce7bdda",
              query: movie,
            },
          }
        );
        setMovieList(response.data.results);
        setMovie("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 25,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Search a film.."
          value={movie}
          onChangeText={setMovie}
        />
        <View>
          <TouchableOpacity
            onPress={fetchData}
            style={{ paddingBottom: 10, paddingLeft: 5 }}
          >
            {loading ? (
              <MaterialCommunityIcons
                name="movie-search"
                size={55}
                color="#f6c71f"
              />
            ) : (
              <TouchableOpacity onPress={() => setLoading(!loading)}>
                <SimpleLineIcons name="close" size={45} color="#f6c71f" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            GENRES
          </Text>
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 30,
                alignItems: "center",
                paddingLeft: 20,
                paddingTop: 15,
              }}
            >
              {genres.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => goDetailPage(item)}
                >
                  <View
                    style={{
                      width: 150,
                      height: 90,
                      backgroundColor: "#f6c71f",
                      justifyContent: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <FlatList
          data={movieList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieContainer}>
              <View
                style={{
                  width: 110,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                  }}
                  style={{
                    width: "100%",
                    height: 150,

                    borderRadius: 20,
                  }}
                  resizeMode="stretch"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text
                  style={styles.describtion}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >
                  {item.overview}
                </Text>
                <Text style={styles.year}>{item.release_date}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
    backgroundColor: "#0f0f0f",
  },
  input: {
    width: 320,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "white",
  },
  movieContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f6c71f",
    flexDirection: "row",
  },
  describtion: {
    fontSize: 14,
    color: "#d3d3d3",
    textAlign: "center",
    width: "90%",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  year: {
    fontSize: 14,
    color: "#d3d3d3",
  },
});

export default SearchMovie;
