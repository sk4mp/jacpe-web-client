import React from "react";
import PropTypes from "prop-types";

import { editmode_select_component } from "../actions";

export default class DraggableComponentButtons extends React.Component {
    render() {
        return (
            <div className="component-buttons">
                <div
                className="button"
                onClick={ () => editmode_select_component(this.props.component_id, this.props.dispatch) }>
                    <i className="fas fa-sliders-h"></i>
                </div>
                <div
                className="button red"
                onClick={ this.props.onDelete }>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        )
    }
}

DraggableComponentButtons.propTypes = {
    component_id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,

    dispatch: PropTypes.func.isRequired
}
