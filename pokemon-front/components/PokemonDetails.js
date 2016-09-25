import React, {PropTypes} from "react";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import PokemonDetailsGeneral from "./PokemonDetailsGeneral";
import PokemonDetailsStats from "./PokemonDetailsStats";
import PokemonDetailsAverageStats from "./PokemonDetailsAverageStats";

const _ = require('lodash');

// https://github.com/callemall/material-ui/issues/288
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const PokemonDetails = ({pokemon}) => {
    return (
        <Tabs>
            <Tab label="General">
                {pokemon && pokemon.id ? <PokemonDetailsGeneral pokemon={pokemon}/> : null}
            </Tab>
            <Tab label="Stats">
                {pokemon.stats ? <PokemonDetailsStats stats={pokemon.stats}/> : null}
            </Tab>
            <Tab label="Average stats">
                {pokemon.averageStats ? <PokemonDetailsAverageStats
                    stats={pokemon.stats}
                    averageStats={pokemon.averageStats}
                /> : null}
            </Tab>
        </Tabs>
    )
};

PokemonDetails.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        sprite: PropTypes.string.isRequired,
        generations: PropTypes.arrayOf(PropTypes.string).isRequired,
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                effort: PropTypes.number.isRequired,
                base_stat: PropTypes.number.isRequired
            })).isRequired,
        averageStats: PropTypes.shape({
            name: PropTypes.string.isRequired,
            stat: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

export default PokemonDetails