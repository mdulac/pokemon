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
            return action.details;
        default:
            return state;
    }
};

export const stats = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_POKEMON_STATS':
            return action.stats;
        default:
            return state;
    }
};