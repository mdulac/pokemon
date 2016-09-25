import {routerReducer as routing} from "react-router-redux";
import {combineReducers} from "redux";
import {pokemons, details, stats} from "./pokemons";
import filter from "./filter";

const rootReducer = combineReducers({
    routing,
    pokemons,
    details,
    stats,
    filter
});

export default rootReducer
