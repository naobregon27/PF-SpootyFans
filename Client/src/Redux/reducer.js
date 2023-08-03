import { GET_ALL_SONGS, GET_SONGS_BY_NAME } from "./actions";

const initialState = {
   songs: [],
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_SONGS:
         return { ...state, songs: action.payload };

      case GET_SONGS_BY_NAME:
         return {...state, songs: action.payload};

      default:
         return { ...state };
   }
};

export default reducer;
