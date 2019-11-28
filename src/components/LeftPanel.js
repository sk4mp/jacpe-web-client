import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { DC_Input_CP } from "../draggable_components/DC_Input";
import { DC_Button_CP } from "../draggable_components/DC_Button";
import { DC_Container_CP } from "../draggable_components/DC_Container";

import "./LeftPanel.css";

class ComponentEditMode extends React.Component {
    // TODO: @placeholder We should make this dynamic to allow users to add custom draggable components
    /*
        Something like this:
        const ConfigPanel = getConfigPanelForComponent("customcomponent");
        return <ConfigPanel />;
    */
    render() {
        if(!this.props.store_editmode.active || !this.props.store_editmode.selected_component) return false;

        const selected_component_id = this.props.store_editmode.selected_component;
        const selected_component = this.props.store_config.components[selected_component_id];

        // Component was deleted
        if(!selected_component) return false;

        switch(selected_component.type) {
            case "input":
                return <DC_Input_CP target_component_id={ selected_component_id } />;
            case "button":
                return <DC_Button_CP target_component_id={ selected_component_id } />;
            case "horizontal_container":
                return <DC_Container_CP target_component_id={ selected_component_id } />;
            default:
                return false;
        }
    }
}

class LeftPanel extends React.Component {
    render() {
        return (
            <div id="left-panel" className={ this.props.store_editmode.active ? "shown" : "" }>
                { this.props.store_editmode.active &&
                <ComponentEditMode
                store_editmode={ this.props.store_editmode }
                store_config={ this.props.store_config }
                /> }
            </div>
        );
    }
}

ComponentEditMode.propTypes = {
    store_editmode: PropTypes.object.isRequired,
    store_config: PropTypes.object.isRequired
}

LeftPanel.propTypes = {
    store_editmode: PropTypes.object.isRequired,
    store_config: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { store_editmode: state.edit_mode, store_config: state.config };
}

export default connect(mapStateToProps)(LeftPanel);

