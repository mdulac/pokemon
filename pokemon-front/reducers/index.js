import {routerReducer as routing} from "react-router-redux";
import {combineReducers} from "redux";
import pokemons from "./pokemons";
import filter from "./filter";

const rootReducer = combineReducers({
    routing,
    pokemons,
    filter
});

export default rootReducer
