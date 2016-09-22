import React, {PropTypes} from "react";
import FlatButton from "material-ui/lib/flat-button";

const Link = ({active, children, onClick}) => {
    if (active) {
        return <FlatButton label={children} primary={active}/>
    }
    return (
        <FlatButton
            href="#"
            label={children}
            primary={active}
            onClick={e => {
         e.preventDefault();
         onClick()
       }}/>
    )
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link