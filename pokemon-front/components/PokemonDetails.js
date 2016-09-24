import React, {PropTypes} from "react";
import Avatar from "material-ui/lib/Avatar";

const PokemonDetails = ({pokemon}) => {
    return (
        <div>
            <div>
                {pokemon.id}
            </div>
            <div>
                {pokemon.name}
            </div>
            <div>
                {pokemon.height}
            </div>
            <div>
                {pokemon.weight}
            </div>
            <div>
                <Avatar backgroundColor="white"
                        size={100}
                        src={pokemon.sprite}
                />
            </div>
        </div>
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