import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./Reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   reducer,
   composeEnhacer(applyMiddleware(thunkMiddleware))
); // Esta linea nos permite hacer peticiones a un servidor

export default store;
