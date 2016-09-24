import {routerReducer as routing} from "react-router-redux";
import {combineReducers} from "redux";
import {pokemons, details} from "./pokemons";
import filter from "./filter";

const rootReducer = combineReducers({
    routing,
    pokemons,
    details,
    filter
});

export default rootReducer
