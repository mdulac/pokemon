import React from 'react'
import {Route} from 'react-router'
import App from './containers/App'
import PokemonDetailsContainer from './containers/PokemonDetailsContainer'

export default (
    <Route>
        <Route path="/" component={App} />
        <Route path="/:name" component={PokemonDetailsContainer}/>
    </Route>
)