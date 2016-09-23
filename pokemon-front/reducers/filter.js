const filter = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.name;
        default:
            return state;
    }
};

export default filter