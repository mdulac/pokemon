import React, {PropTypes} from "react";
import Table from "material-ui/lib/table/table";
import TableRow from "material-ui/lib/table/table-row";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";
import Avatar from 'material-ui/lib/Avatar';
import FlatButton from 'material-ui/lib/flat-button';

import {Link} from 'react-router'

const _ = require('lodash');

const PokemonList = ({pokemons}) => {

    const style = {margin: 5};

    return (
        <Table selectable={false}>
            <TableBody showRowHover={true} displayRowCheckbox={false}>
                {pokemons.map(pokemon =>
                    <TableRow key={pokemon.name}>
                        <TableRowColumn>
                            <Avatar
                                size={30}
                                style={style}>
                                {_.toUpper(pokemon.name[0])}
                            </Avatar>
                            <Link to={`/${pokemon.name}`}>
                                <FlatButton label={pokemon.name}/>
                            </Link>
                        </TableRowColumn>
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