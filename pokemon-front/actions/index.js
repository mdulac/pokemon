const conf = require('../conf/conf');

const API_ROOT = conf.middleware.protocol
    + '://'
    + conf.middleware.host
    + ':'
    + conf.middleware.port
    + conf.middleware.context;

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
};

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
};