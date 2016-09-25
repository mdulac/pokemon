import React from "react";
import {connect} from "react-redux";
import {filter} from "../actions/filter";

import TextField from "material-ui/lib/text-field";

let Filter = ({dispatch}) => {
    let input;

    return (
        <div>
            <TextField
                onChange={(e, v) => {
                    dispatch(filter(v))
                }
                }
                floatingLabelText="Pokemon Name"
                ref={node => {
                    input = node
                }}
            />
        </div>
    );
};

Filter = connect()(Filter);

export default Filter