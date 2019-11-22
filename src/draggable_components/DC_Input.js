import React from "react";
import PropTypes from "prop-types";

export default class DC_Input extends React.Component {
    render() {
        return (
            <div component_id={ this.props.component_id } className="ui-input-with-name">
                <div className="ui-input-name1">Some input</div>
                <input type="text" className="ui-input1" />
            </div>
        )
    }
}

DC_Input.propTypes = {
    component_id: PropTypes.string.isRequired
}
