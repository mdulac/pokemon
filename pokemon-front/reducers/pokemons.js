const pokemons = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_POKEMON_LIST':
            return action.list;
        default:
            return state;
    }
};

export default pokemons;