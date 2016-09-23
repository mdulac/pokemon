import React, {PropTypes} from "react";
import Table from "material-ui/lib/table/table";
import TableRow from "material-ui/lib/table/table-row";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";

const PokemonList = ({pokemons}) => {
    return (
        <Table selectable={false}>
            <TableBody showRowHover={true} displayRowCheckbox={false}>
                {pokemons.map(pokemon =>
                    <TableRow key={pokemon.name}>
                        <TableRowColumn>{pokemon.name}</TableRowColumn>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};

PokemonList.propTypes = {
    pokemons: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default PokemonList