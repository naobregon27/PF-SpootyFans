import axios from "axios";

export const GET_ALL_SONGS = "GET_ALL_SONGS";
export const GET_SONGS_BY_NAME = "GET_SONGS_BY_NAME";
export const GET_SONGS_BY_ARTIST = "GET_SONGS_BY_ARTIST";
export const GET_SONGS_BY_GENRE = "GET_SONGS_BY_GENRE";
export const SEARCH_ID = "SEARCH_ID";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

//Trae todas las canciones dentro de la base de datos
export const allSongs = () => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:3001/music/all", {
        headers: {
          "x-access-token": token,
        },
      });
      const songs = data;
      dispatch({ type: GET_ALL_SONGS, payload: songs });
    } catch (error) {
      console.error("Error while fetching songs:", error.message);
    }
  };
};

export const findSong = (name) => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:3001/music?name=${name}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const songByName = data;
      dispatch({ type: GET_SONGS_BY_NAME, payload: songByName });
    } catch (error) {
      console.error("Error while finding song:", error.message);
    }
  };
};

export const searchId = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3001/music/detail/${id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      dispatch({
        type: SEARCH_ID,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
};

export const allCategories = () =>{
  return async  (dispatch) => {
    const token = localStorage.getItem("token")
    try {
      const {data} = await axios.get("http://localhost:3001/category", {
        headers: {
          "x-access-token": token,
        }
      });
      dispatch({type: GET_ALL_CATEGORIES, payload: data})
    } catch (error) {
      console.error(error);
    }
  }
}


export const filterByGenre = (payload) => {
  return{
    type:GET_SONGS_BY_GENRE,
    payload
  }
}
