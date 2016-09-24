import React, {PropTypes} from "react";
import Avatar from "material-ui/lib/Avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";

const _ = require('lodash');

// https://github.com/callemall/material-ui/issues/288
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const PokemonDetails = ({pokemon}) => {
    return (
        <Tabs>
            <Tab label="General">
                <div>
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
                </div>
            </Tab>
            <Tab label="Stats">
                <div>
                    <List>
                        {pokemon.stats ? (<ListItem>
                            <List>
                                {pokemon.stats.map(s => {
                                    return (
                                        <ListItem key={s.name}
                                                  primaryText={`Name : ${s.name} | Effort : ${s.effort} | Base stat : ${s.base_stat}`}/>
                                    )
                                })}
                            </List>
                        </ListItem>) : null}
                    </List>
                </div>
            </Tab>
        </Tabs>
    )
};

PokemonDetails.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        sprite: PropTypes.string.isRequired,
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                effort: PropTypes.number.isRequired,
                base_stat: PropTypes.number.isRequired
            })).isRequired
    }).isRequired
};

export default PokemonDetails