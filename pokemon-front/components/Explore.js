import React, {Component, PropTypes} from "react";
import RaisedButton from "material-ui/lib/raised-button";
import TextField from "material-ui/lib/text-field";

export default class Explore extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Material-ui</h1>
                <h2>Example project with React and Redux</h2>
                <TextField
                    hintText="Task"
                />

                <br/>

                <RaisedButton
                    label="Add"
                    primary={true}
                />
            </div>
        )
    }
}

Explore.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
