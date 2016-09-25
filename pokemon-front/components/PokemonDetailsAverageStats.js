import React, {PropTypes} from "react";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

const _ = require('lodash');

const PokemonDetailsAverageStats = ({stats, averageStats}) => {
    return (
        <List>
            <ListItem>
                <List>
                    {_.map(averageStats, s => {
                        const stat = _.find(stats, o => o.name === s.name);
                        return (
                            <ListItem key={s.name}
                                      primaryText={`${s.name} : ${stat.base_stat} / ${s.stat}`}/>
                        )
                    })}
                </List>
            </ListItem>
        </List>
    )
};

PokemonDetailsAverageStats.propTypes = {
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            effort: PropTypes.number.isRequired,
            base_stat: PropTypes.number.isRequired
        })).isRequired,
    averageStats: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            stat: PropTypes.number.isRequired
        })).isRequired
};

export default PokemonDetailsAverageStats