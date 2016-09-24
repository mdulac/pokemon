import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {fetchPokemonDetails} from "../actions";
import PokemonDetails from "../components/PokemonDetails";

class PokemonDetailsContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {dispatch, name} = this.props;
        dispatch(fetchPokemonDetails(name))
    }

    render() {
        return (
            <div>
                <PokemonDetails pokemon={{
                    id: this.props.id,
                    name: this.props.name,
                    height: this.props.height,
                    weight: this.props.weight,
                    sprite: this.props.sprite,
                }}/>
            </div>
        )
    }

}

PokemonDetailsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.details.id,
        name: ownProps.params.name,
        height: state.details.height,
        weight: state.details.weight,
        sprite: state.details.sprite,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PokemonDetailsContainer);