import React from "react";
import {connect} from "react-redux";
import {addTodo} from "../actions/todo";

import TextField from "material-ui/lib/text-field";
import RaisedButton from "material-ui/lib/raised-button";

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <form onSubmit={e => {
        e.preventDefault();
        if (!input.getValue().trim()) {
          return
        }
        dispatch(addTodo(input.getValue()));
        input.value = ''
      }}>
                <TextField
                    floatingLabelText="Task name"
                    ref={node => { input = node }}
                />
                <br/>
                <RaisedButton
                    type="submit"
                    label="Add task"
                    primary={true}
                />

            </form>
        </div>
    )
};

AddTodo = connect()(AddTodo);

export default AddTodo