import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createDraggableComponentFromType } from "../tools";
import { config_assign_component, config_delete_panel } from "../actions";

class DraggablePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO: @css Add dragOver styles
            dragOver: false,
            empty: true,
            deleted: false,
            child_components: []
        }

        this.deletePanel = this.deletePanel.bind(this);

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    shouldComponentUpdate(next_props, next_state) {
        // Deleted
        if(this.state.deleted) return false;
        if(next_state.deleted !== this.state.deleted) return true;

        // Empty
        if(next_state.empty !== this.state.empty) return true;

        // On child_components update (happens when a panel changes in `config` redux store)
        if(next_state.child_components !== this.state.child_components) return true;

        // Check if the panel changed in `config` redux store
        if(
            next_props.store_config.panels[this.props.panel_id] !== this.props.store_config.panels[this.props.panel_id]
        ) return true;

        return false;
    }

    componentDidUpdate(prev_props) {
        // This panel was deleted
        if(this.props.store_config.panels[this.props.panel_id] === false) {
            this.setState({ deleted: true });
            return false;
        }

        // To make things a bit less messy
        const store_panel = this.props.store_config.panels[this.props.panel_id];

        // Panel config changed
        if(prev_props.store_config.panels[this.props.panel_id] !== store_panel) {
            // Get all child_components for this panel
            const l = store_panel.child_components.length;

            // If the panel is empty
            if(l === 0) {
                this.setState({ empty: true });
                return;
            }

            const child_components = [];

            for(let i = 0; i < l; i++) {
                const component_id = store_panel.child_components[i];
                const component = this.props.store_config.components[component_id];

                // Check if component is not deleted
                if(component) {
                    child_components.push(component.element);
                }
            }

            this.setState({ child_components, empty: false });
        }
    }

    onDragEnter(e) {
        this.setState({ dragOver: true });

        e.preventDefault();
        return true;
    }

    onDragLeave(e) {
        this.setState({ dragOver: false });

        e.preventDefault();
        return true;
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        // Get the component type from dataTransfer
        const component_type = e.dataTransfer.getData("text");

        // Create a new component from type
        const new_component = createDraggableComponentFromType(component_type, this.props.panel_id);

        // Check if the new component was reutrned (the function above returns false on error)
        if(new_component) {
            // Assign component to panel in redux store (which will cause this panel to rerender with a new component)
            config_assign_component(new_component, component_type, this.props.panel_id, this.props.dispatch);
        }

        this.setState({ dragOver: false });

        e.stopPropagation();
        return false;
    }

    deletePanel() {
        config_delete_panel(this.props.panel_id, this.props.dispatch);

        // Call parent's onDelete
        this.props.onDelete && this.props.onDelete(this.props.panel_id);
    }

    render() {
        if(this.state.deleted) return false;

        return (
            <div
            className={
                "draggable-panel" +
                (this.state.dragOver ? " drag-over" : "") +
                (this.state.empty ? " empty" : "")
            }
            panel_id={ this.props.panel_id }

            onDragEnter={ this.onDragEnter }
            onDragLeave={ this.onDragLeave }
            onDrop={ this.onDrop }
            onDragOver={ this.onDragOver }
            >
                { this.state.child_components }

                { this.state.empty && <div className="center-text">This panel is empty</div> }

                <div className="panel-buttons">
                    <div className="button"><i className="fas fa-sliders-h"></i></div>
                    <div className="button red" onClick={ this.deletePanel }><i className="fas fa-times"></i></div>
                </div>
            </div>
        );
    }
}

DraggablePanel.propTypes = {
    panel_id: PropTypes.string.isRequired,
    onDelete: PropTypes.func,

    store_config: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_config: state.config };
}

export default connect(mapStateToProps)(DraggablePanel);
