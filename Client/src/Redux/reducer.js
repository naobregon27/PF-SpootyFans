import { GET_ALL_SONGS, GET_SONGS_BY_NAME, SEARCH_ID } from "./actions";

const initialState = {
   songs: [],
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

      default:
         return { ...state };
   }
};

export default reducer;
