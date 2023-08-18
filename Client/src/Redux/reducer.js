//import { songs } from "../../../Server/data";
import {
  GET_ALL_SONGS,
  GET_SONGS_BY_NAME,
  GET_SONGS_BY_ARTIST,
  SEARCH_ID,
  GET_SONGS_BY_GENRE,
  GET_SONGS_BY_RATING,
  GET_ALL_PLAYLISTS,
  GET_ALL_CATEGORIES,
  PLAY_MUSIC, 
  PAUSE_MUSIC,
  SET_CURRENT_SONG_URLS,
} from "./actions";

const initialState = {
  songs: [],
  playLists: [],
  songsCopy: [],
  playlistsCopy: [],
  categories: [],
  isPlaying: false,
  currentSongUrl: "",
  currentSongUrls: [],
};

const reducer = (state = initialState, action) => {
  // const songsCopy = [...state.songs];
  switch (action.type) {
    case GET_ALL_SONGS:
      return { ...state, songs: action.payload, songsCopy: action.payload };

    case GET_ALL_PLAYLISTS:
      return {
        ...state,
        playLists: action.payload,
        playlistsCopy: action.payload,
      };
    case SEARCH_ID:
      return {
        ...state,
        songsDetail: action.payload,
      };

    case GET_SONGS_BY_NAME:
      return {
        ...state,
        songsCopy: action.payload,
      };

      case GET_SONGS_BY_ARTIST:
        return {
          ...state,
          songsCopy: action.payload,
        };
      
    case GET_SONGS_BY_GENRE:
      return {
        ...state,
        songsCopy: state.songsCopy.filter((song) => song.genre === action.payload),
      };
      
    case GET_ALL_CATEGORIES:

      const genres = new Set();
      genres.add("All");
      action.payload.forEach((genre) => genres.add(genre.name));
      const newGenres = Array.from(genres).map((genresName) => {
        return {
          name: genresName,
        };
      });

      return {
        ...state,
        categories: newGenres,
      };

    case PLAY_MUSIC:
      return { ...state, isPlaying: true };

    case PAUSE_MUSIC:
      return { ...state, isPlaying: false };

    case SET_CURRENT_SONG_URLS:
        return {
          ...state,
          currentSongUrls: action.payload,
        };

    case GET_SONGS_BY_RATING:
      return{
        ...state,
        songsCopy: state.songsCopy.filter((song) => song.averageRating === Number(action.payload)),
      }
    default:
      return { ...state };
  }

};

export default reducer;
