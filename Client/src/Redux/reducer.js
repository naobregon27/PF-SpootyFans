import { GET_ALL_SONGS } from "./actions";

const initialState = {
   songs:[],
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_SONGS:
         return{...state, songs: action.payload};

         default:
            return { ...state };
   }
}

export default reducer;
