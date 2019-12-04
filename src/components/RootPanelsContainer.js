import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { config_create_panel } from "../actions";

class RootPanelContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            child_panels: [],
            deleted: false
        }

        this.createNewPanel = this.createNewPanel.bind(this);
        this.onPanelDeleted = this.onPanelDeleted.bind(this);
    }

    createNewPanel() {
        const new_panel = config_create_panel(this.props.dispatch);

        const new_panel_object = {
            panel_id: new_panel.props.panel_id,
            element: new_panel
        }

        this.setState({ child_panels: [
            ...this.state.child_panels,
            new_panel_object
        ] });

        // Call parent's onClick
        this.props.onClick && this.props.onClick();
    }

    onPanelDeleted(panel_id) {
        const new_state = this.state;

        // Find panel to remove
        for(const i in new_state.child_panels) {
            if(new_state.child_panels[i].panel_id === panel_id) {
                new_state.child_panels.splice(i, 1);
                break;
            }
        }

        // Deleted the last panel in the container
        if(new_state.child_panels.length === 0) {
            new_state.deleted = true;
        }

        this.setState(new_state);
    }

    render() {
        if(this.state.deleted) return false;

        let panels = [];

        // TODO: @performance maybe?
        for(const panel of this.state.child_panels) {
            panels.push(React.cloneElement(panel.element, {
                panel_id: panel.panel_id,
                onDelete: this.onPanelDeleted
            }));
        }

        return (
            <div
            className={"root-panels-container" + (this.props.hidden ? " hidden" : "")
            + (this.props.new_container ? " new_container" : "")}>
                { panels }

                <div className="panel-placeholder"
                onClick={ this.createNewPanel } >
                    { this.props.new_container
                    ? <div className="add-icon"><i className="fas fa-chevron-right"></i></div>
                    : <div className="add-icon"><i className="fas fa-plus"></i></div> }
                </div>
            </div>
        );
    }
}

RootPanelContainer.propTypes = {
    onClick: PropTypes.func,
    new_container: PropTypes.bool,
    hidden: PropTypes.bool,

    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_editmode: state.edit_mode };
}

export default connect(mapStateToProps)(RootPanelContainer);
