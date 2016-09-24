export const pokemons = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_POKEMON_LIST':
            return action.list;
        default:
            return state;
    }
};

export const details = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_POKEMON_DETAILS':
            console.log(state);
            console.log(action);
            return action.details;
        default:
            return state;
    }
};