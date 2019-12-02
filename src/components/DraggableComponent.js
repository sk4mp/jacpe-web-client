import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import DraggableComponentButtons from "./DraggableComponentButtons";

import { config_delete_component } from "../actions";

class DraggableComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deleted: false
        }

        this.deleteComponent = this.deleteComponent.bind(this);
    }

    deleteComponent() {
        config_delete_component(this.props.component_id, this.props.dispatch);
        this.setState({ deleted: true });
    }

    render() {
        if(this.state.deleted) return false;

        return (
            <div
            className="ui-draggable-component"
            >
                { this.props.children }

                <DraggableComponentButtons
                component_id={ this.props.component_id }
                onDelete={ this.deleteComponent }
                dispatch={ this.props.dispatch } />
            </div>
        )
    }
}

DraggableComponent.propTypes = {
    component_id: PropTypes.string.isRequired,

    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_config: state.config };
}

export default connect(mapStateToProps)(DraggableComponent);
