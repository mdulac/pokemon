import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import Appli from "../components/App";
import {fetchPokemonList} from "../actions";

class App extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDismissClick = this.handleDismissClick.bind(this)
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(fetchPokemonList())
    }

    handleDismissClick(e) {
        e.preventDefault()
    }

    handleChange(nextValue) {
        browserHistory.push(`/${nextValue}`)
    }

    renderErrorMessage() {
        const {errorMessage} = this.props;
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{backgroundColor: '#e99', padding: 10}}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                Dismiss
            </a>)
            </p>
        )
    }

    render() {
        const {children} = this.props;
        return (
            <div>
                <Appli />
                <hr />
                {this.renderErrorMessage()}
                {children}
            </div>
        )
    }
}

App.propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
