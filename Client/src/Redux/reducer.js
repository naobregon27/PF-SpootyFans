//import { songs } from "../../../Server/data";
import { GET_ALL_SONGS, GET_SONGS_BY_NAME, SEARCH_ID, GET_SONGS_BY_GENRE } from "./actions";

const initialState = {
   songs: [],
   songFiltered: [],
};

const reducer = (state = initialState, action) => {
   // const songsCopy = [...state.songs];
   switch (action.type) {
      case GET_ALL_SONGS:
         return { ...state, songs: action.payload };
         
         // case GET_SONGS_BY_NAME:
         // return {...state, songsCopy: action.payload};
      
      case SEARCH_ID:
         return{
            ...state,
            songsDetail: action.payload};

      case GET_SONGS_BY_GENRE:
         return{
            ...state,
            songsFiltered: songs.filter((song) => song.genre === action.payload)
         }

      default:
         return { ...state };
   }
};

export default reducer;
