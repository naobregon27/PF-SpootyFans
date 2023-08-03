import axios from "axios";

export const GET_ALL_SONGS = "GET_ALL_SONGS";
export const GET_SONGS_BY_NAME = "GET_SONGS_BY_NAME";
export const GET_SONGS_BY_ARTIST = "GET_SONGS_BY_ARTIST";
export const GET_SONGS_BY_GENRE = "GET_SONGS_BY_GENRE";

//Trae todas las canciones dentro de la base de datos
export const allSongs = () => {
   return async function (dispatch) {
      const { data } = await axios.get("http://localhost:3001/musica/all");
      const songs = data;
      dispatch({type: GET_ALL_SONGS, payload: songs});
   };
};

export const findSong = (name) => {
   return async function (dispatch) {
      const {data} = await axios.get(`http://localhost:3001/musica/?name=${name}`);
      const songByName = data;
      dispatch({type: GET_SONGS_BY_NAME, payload: songByName})
   }
}