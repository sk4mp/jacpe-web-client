import React from "react";
import PropTypes from "prop-types";

export default class DC_Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO: @misc This is messy
        let className = "ui-button" + (this.props.type || "1");

        if(this.props.size) {
            className += " " + this.props.size;
        } else {
            className += " bigger";
        }

        if(this.props.color) className += " " + this.props.color;
        if(this.props.emphasis) className += " " + this.props.emphasis;

        return (
            <button
            className={ className }
            component_id={ this.props.component_id }
            >
                { this.props.text || "button" }
            </button>
        )
    }
}

DC_Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    emphasis: PropTypes.string,

    component_id: PropTypes.string.isRequired
}
