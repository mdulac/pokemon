import React from 'react'
import AddTodo from '../containers/Filter'
import VisibleTodoList from '../containers/FilteredPokemonList'

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
    </div>
);

export default App