import { spotyFansApi } from "../../services/apiConfig";

export const GET_ALL_SONGS = "GET_ALL_SONGS";
export const GET_SONGS_BY_NAME = "GET_SONGS_BY_NAME";
export const GET_SONGS_BY_ARTIST = "GET_SONGS_BY_ARTIST";
export const GET_SONGS_BY_GENRE = "GET_SONGS_BY_GENRE";
export const GET_SONGS_BY_RATING = "GET_SONGS_BY_RATING";
export const SEARCH_ID = "SEARCH_ID";
export const GET_ALL_PLAYLISTS = "GET_ALL_PLAYLISTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const PLAY_MUSIC = "PLAY_MUSIC";
export const PAUSE_MUSIC = "PAUSE_MUSIC";
export const SET_CURRENT_SONG_URLS = "SET_CURRENT_SONG_URLS";
export const RESET_SONGS_COPY = "RESET_SONGS_COPY";

//Trae todas las canciones dentro de la base de datos
export const allSongs = () => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const { data } = await spotyFansApi.get("/music/all", {
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

export const allSongsRating = (payload) => {
  return {
    type: GET_SONGS_BY_RATING,
    payload,
  }
}


export const allPlayLists = () => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const { data } = await spotyFansApi.get("/playlist", {
        headers: {
          "x-access-token": token,
        },
      });
      const playLists = data;
      dispatch({ type: GET_ALL_PLAYLISTS, payload: playLists });
    } catch (error) {
      console.error("Error while fetching playlists:", error.message);
    }
  };
};

export const findSong = (name) => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const { data } = await spotyFansApi.get(`/music?name=${name}`, {
        headers: {
          "x-access-token": token,
        },
      });
      const songByName = data;
      dispatch({ type: GET_SONGS_BY_NAME, payload: songByName });
    } catch (error) {
      console.error("Error while finding song:", error.message);
    }
  };
};

export const findSongByArtist = (artist) => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const { data } = await spotyFansApi.get(`/music?artist=${artist}`, {
        headers: {
          "x-access-token": token,
        },
      });
      const songByName = data;
      dispatch({ type: GET_SONGS_BY_ARTIST, payload: songByName });
    } catch (error) {
      console.error("Error while finding song:", error.message);
    }
  };
};

export const searchId = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const response = await spotyFansApi.get(`/music/detail/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
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

export const allCategories = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await spotyFansApi.get("/category", {
        headers: {
          "x-access-token": token,
        },
      });
      dispatch({ type: GET_ALL_CATEGORIES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filterByGenre = (payload) => {
  return {
    type: GET_SONGS_BY_GENRE,
    payload,
  };
};

export const setRating = (stars, idSong) =>{
  return async () => {
    const token = localStorage.getItem("token");
    try {
      const rate = await spotyFansApi.post(`/music/rate`, {idSong,stars}, {
        headers: {
          "x-access-token": token,
        },
      });
      alert("Thanks for your rate!")
    } catch (error) {
      alert("You have already rated this song");
    }
  };
}

export const playMusic = () => ({
  type: PLAY_MUSIC,
});

export const pauseMusic = () => ({
  type: PAUSE_MUSIC,
});

export const setCurrentSongUrls = (urls) => ({
  type: SET_CURRENT_SONG_URLS,
  payload: urls,
});

export const resetSongsCopy = () => ({
  type: RESET_SONGS_COPY,
});