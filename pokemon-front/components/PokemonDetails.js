import React, {PropTypes} from "react";
import Avatar from "material-ui/lib/Avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

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
        </List>
    )
};

PokemonDetails.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        sprite: PropTypes.string.isRequired
    }).isRequired
};

export default PokemonDetails