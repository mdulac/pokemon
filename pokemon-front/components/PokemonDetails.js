import React, {PropTypes} from "react";
import Avatar from "material-ui/lib/Avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

const _ = require('lodash');

const PokemonDetails = ({pokemon}) => {
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
            <ListItem primaryText={`Height : ${pokemon.height ? pokemon.height : ''}`}/>
            <ListItem primaryText={`Weight : ${pokemon.weight ? pokemon.weight : ''}`}/>
            {pokemon.stats ? (<ListItem>
                <List>
                    {pokemon.stats.map(s => {
                        return (
                            <ListItem primaryText={`Name : ${s.name} | Effort : ${s.effort} | Base stat : ${s.base_stat}`}/>
                        )
                    })}
                </List>
            </ListItem>) : null}
        </List>
    )
};

PokemonDetails.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        sprite: PropTypes.string.isRequired,
        stats: PropTypes.shape({
            name: PropTypes.string.isRequired,
            effort: PropTypes.number.isRequired,
            base_stat: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

export default PokemonDetails