import React, {PropTypes} from "react";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

const _ = require('lodash');

const PokemonDetailsStats = ({stats}) => {
    return (
        <List>
            <ListItem>
                <List>
                    {stats.map(s => {
                        return (
                            <ListItem key={s.name}
                                      primaryText={`Name : ${s.name} | Effort : ${s.effort} | Base stat : ${s.base_stat}`}/>
                        )
                    })}
                </List>
            </ListItem>
        </List>
    )
};

PokemonDetailsStats.propTypes = {
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            effort: PropTypes.number.isRequired,
            base_stat: PropTypes.number.isRequired
        })).isRequired
};

export default PokemonDetailsStats