//import { songs } from "../../../Server/data";
import { GET_ALL_SONGS, GET_SONGS_BY_NAME, SEARCH_ID, GET_SONGS_BY_GENRE, GET_ALL_PLAYLISTS } from "./actions";

const initialState = {
   songs: [],
   playLists: [],
   songsCopy: [],
   playlistsCopy: [],
};

const reducer = (state = initialState, action) => {
   // const songsCopy = [...state.songs];
   switch (action.type) {
      case GET_ALL_SONGS:
         return { ...state, songs: action.payload, songsCopy: action.payload };
         
         // case GET_SONGS_BY_NAME:
         // return {...state, songsCopy: action.payload};
      case GET_ALL_PLAYLISTS:
         return { ...state, playLists: action.payload, playlistsCopy: action.payload };
      case SEARCH_ID:
         return{
            ...state,
            songsDetail: action.payload};

      case GET_SONGS_BY_NAME:
         return{
            ...state,
            songsCopy:  action.payload
         }

      case GET_SONGS_BY_GENRE:
         return{
            ...state,
            songsCopy: state.songs.filter((song) => song.genre === action.payload)
         }

      default:
         return { ...state };
   }
};

export default reducer;
