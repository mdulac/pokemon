import React, {PropTypes} from "react";
import Avatar from "material-ui/lib/Avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

const _ = require('lodash');

const PokemonDetailsGeneral = ({pokemon}) => {
    return (
        <List>
            <ListItem>
                <Avatar backgroundColor="white"
                        size={100}
                        src={pokemon.sprite}
                />
            </ListItem>
            <ListItem primaryText={`Id : ${pokemon.id ? pokemon.id : ''}`}/>
            <ListItem primaryText={`Name : ${pokemon.name ? pokemon.name : ''}`}/>
            <ListItem primaryText={`Order : ${pokemon.order ? pokemon.order : ''}`}/>
            <ListItem
                primaryText={`Types : ${pokemon.types ? pokemon.types.map(t => t.name).join(', ') : ''}`}/>
            <ListItem primaryText={`Height : ${pokemon.height ? pokemon.height : ''}`}/>
            <ListItem primaryText={`Weight : ${pokemon.weight ? pokemon.weight : ''}`}/>
            <ListItem
                primaryText={`Generations : ${pokemon.generations ? pokemon.generations.map(g => g.name).join(', ') : ''}`}/>
        </List>
    )
};

PokemonDetailsGeneral.propTypes = {
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
            })).isRequired
    }).isRequired
};

export default PokemonDetailsGeneral