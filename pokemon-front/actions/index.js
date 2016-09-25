const conf = require('../conf/conf');

const API_ROOT = conf.middleware.protocol
    + '://'
    + conf.middleware.host
    + ':'
    + conf.middleware.port
    + conf.middleware.context;

// Pokemon list

export const REQUEST_POKEMON_LIST = 'REQUEST_POKEMON_LIST';
export const RECEIVE_POKEMON_LIST = 'RECEIVE_POKEMON_LIST';

export const requestPokemonList = () => ({
    type: REQUEST_POKEMON_LIST
});

export const receivePokemonList = (json) => ({
    type: RECEIVE_POKEMON_LIST,
    list: json.results,
    receivedAt: Date.now()
});

export const fetchPokemonList = () => (dispatch, getState) => {
    dispatch(requestPokemonList());
    return fetch(`${API_ROOT}/pokemon`)
        .then(response => response.json())
        .then(json => dispatch(receivePokemonList(json)))
        .catch(function (ex) {
            console.error('Error while fetching pokemon list', ex)
        })
};

// Pokemon details

export const REQUEST_POKEMON_DETAILS = 'REQUEST_POKEMON_DETAILS';
export const RECEIVE_POKEMON_DETAILS = 'RECEIVE_POKEMON_DETAILS';

export const requestPokemonDetails = () => ({
    type: REQUEST_POKEMON_DETAILS
});

export const receivePokemonDetails = (json) => ({
    type: RECEIVE_POKEMON_DETAILS,
    details: json,
    receivedAt: Date.now()
});

export const fetchPokemonDetails = (name) => (dispatch, getState) => {
    dispatch(requestPokemonDetails());
    return fetch(`${API_ROOT}/pokemon/${name}`)
        .then(response => response.json())
        .then(json => dispatch(receivePokemonDetails(json)))
        .catch(function (ex) {
            console.error('Error while fetching pokemon details', ex)
        })
};

// Pokemon stats

export const REQUEST_POKEMON_STATS = 'REQUEST_POKEMON_STATS';
export const RECEIVE_POKEMON_STATS = 'RECEIVE_POKEMON_STATS';

export const requestPokemonStats = () => ({
    type: REQUEST_POKEMON_STATS
});

export const receivePokemonStats = (json) => ({
    type: RECEIVE_POKEMON_STATS,
    stats: json,
    receivedAt: Date.now()
});

export const fetchPokemonStats = (name) => (dispatch, getState) => {
    dispatch(requestPokemonStats());
    return fetch(`${API_ROOT}/stats/${name}`)
        .then(response => response.json())
        .then(json => dispatch(receivePokemonStats(json)))
        .catch(function (ex) {
            console.error('Error while fetching pokemon stats', ex)
        })
};
