import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import DraggableComponent from "../components/DraggableComponent";

import { createDraggableComponentFromType } from "../tools";
import { config_component_edit_children, config_edit_component} from "../actions";

// Left panel config for this component
export class DC_Container_CP extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="component-intro-block">
                    <div className="name">Horizontal container</div>
                    <div className="description">Used to horizontally position other components.</div>
                </div>

                <div className="ui-text">🚧 Options will be here...</div>
            </div>
        )
    }
}

class DC_Сontainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dragOver: false,
            child_components: []
        }

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    shouldComponentUpdate(next_props, next_state) {
        // On child_components update (happens when a component changes in `config` redux store)
        if(next_state.child_components !== this.state.child_components) return true;

        // DragOver change
        if(next_state.dragOver !== this.state.dragOver) return true;

        // Check if the component changed in `config` redux store
        if( next_props.store_config.components[this.props.component_id]
            !==
            this.props.store_config.components[this.props.component_id]
        ) return true;

        return false;
    }

    componentDidUpdate(prev_props) {
        // To make things a bit less messy
        const store_component = this.props.store_config.components[this.props.component_id];

        // Component's config changed
        if(prev_props.store_config.components[this.props.component_id] !== store_component) {
            // Get all child_components for this container
            const l = store_component.child_components.length;
            const child_components = [];

            for(let i = 0; i < l; i++) {
                const component_id = store_component.child_components[i];
                const component = this.props.store_config.components[component_id];

                // Check if component is not deleted
                if(component) {
                    child_components.push(component.element);
                }
            }

            this.setState({ child_components });
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

        // Check if user is trying to drop a container inside a container
        // TODO: @css maybe flash the container red to indicate that you can't do that
        if(component_type === "horizontal_container") {
            this.setState({ dragOver: false });

            e.stopPropagation();
            return false;
        }

        // Create a new component from type
        const new_component = createDraggableComponentFromType(component_type);

        // Check if new component was reutrned (the function above returns false on error)
        if(new_component) {
            // Updated component's child_components (ids)
            let new_child_components;

            // New component object for `config` redux store
            // TODO: @misc We should have an interface for component object
            const new_component_object = {
                element: new_component,
                type: component_type,
                panel_id: this.props.panel_id
            }

            // Check if this component (DC_Container) has children
            if(this.props.store_config.components[this.props.component_id].child_components) {
                // TODO: @performance
                new_child_components = [
                    ...this.props.store_config.components[this.props.component_id].child_components,
                    new_component.props.component_id
                ]
            } else {
                new_child_components = [new_component.props.component_id];
            }

            // Add the new component to the store
            config_edit_component(new_component_object, this.props.dispatch);

            // Append the new component to this DC_Container
            config_component_edit_children(this.props.component_id, new_child_components, this.props.dispatch);
        }

        this.setState({ dragOver: false });

        e.stopPropagation();
        return false;
    }

    render() {
        return (
            <DraggableComponent component_id={ this.props.component_id }>
                <div
                className={ "ui-ccontainer" + (this.state.dragOver ? " drag-over" : "") }

                onDragEnter={ this.onDragEnter }
                onDragLeave={ this.onDragLeave }
                onDrop={ this.onDrop }
                onDragOver={ this.onDragOver }
                >
                    { this.state.child_components }
                </div>
            </DraggableComponent>
        );
    }
}

DC_Сontainer.propTypes = {
    component_id: PropTypes.string.isRequired,
    panel_id: PropTypes.string.isRequired,

    dispatch: PropTypes.func.isRequired,
    store_config: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { store_config: state.config };
}

export default connect(mapStateToProps)(DC_Сontainer);
