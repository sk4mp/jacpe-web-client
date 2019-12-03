import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { config_edit_component } from "../actions";

class DraggableComponentConfigPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            last_component_props: props.component_props
        }

        this.save = this.save.bind(this);
    }

    save() {
        const edited_component = this.props.store_config.components[this.props.target_component_id];

        edited_component.props = { ...edited_component.props, ...this.props.component_props };

        // Save the component in `config` redux store
        config_edit_component(edited_component, this.props.dispatch);

        this.setState({ last_component_props: this.props.component_props });
    }

    render() {
        return (
            <div className="content component-editor">
                { this.props.children }

                <div className={"bottom-panel" +
                (this.state.last_component_props === this.props.component_props ? " hidden" : "")}>
                    <div></div>
                    <div>
                        <button onClick={ this.save } className="ui-button1 big low-emp">save</button>
                    </div>
                </div>
            </div>
        )
    }
}

DraggableComponentConfigPanel.propTypes = {
    target_component_id: PropTypes.string.isRequired,
    component_props: PropTypes.object.isRequired,

    children: PropTypes.any.isRequired,

    store_config: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_config: state.config };
}

export default connect(mapStateToProps)(DraggableComponentConfigPanel);
