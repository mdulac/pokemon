import {connect} from "react-redux";
import PokemonList from "../components/PokemonList";
const _ = require('lodash');

const filter = (pokemons, name) => {
    const criteria = _.toLower(_.trim(name));
    switch (name) {
        case '':
            return pokemons;
        default :
            return pokemons.filter(p => _.includes(_.toLower(p.name), criteria))
    }
};

const mapStateToProps = (state) => {
    return {
        pokemons: filter(state.pokemons, state.filter)
    }
};

const PokemonListContainer = connect(
    mapStateToProps
)(PokemonList);

export default PokemonListContainer