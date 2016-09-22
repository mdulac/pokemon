import React, {PropTypes} from "react";
import Table from "material-ui/lib/table/table";
import TableRow from "material-ui/lib/table/table-row";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";
import Toggle from "material-ui/lib/toggle";

const TodoList = ({todos, onTodoClick}) => (
        <Table selectable={false}>
            <TableBody deselectOnClickaway={false}
                       showRowHover={true}>
                {todos.map(todo =>
                    <TableRow
                        key={todo.id}
                        selected={todo.completed}>
                        <TableRowColumn>{todo.id}</TableRowColumn>
                        <TableRowColumn>{todo.text}</TableRowColumn>
                        <TableRowColumn>
                            <Toggle
                                defaultToggled={todo.completed}
                                onToggle={() => onTodoClick(todo.id)}
                            />
                        </TableRowColumn>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
    ;

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList