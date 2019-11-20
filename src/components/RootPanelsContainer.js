import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { config_create_panel } from "../actions";

class RootPanelContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            child_panels: []
        }

        this.createNewPanel = this.createNewPanel.bind(this);
    }

    createNewPanel() {
        const new_panel = config_create_panel(this.props.dispatch);

        this.setState({ child_panels: [...this.state.child_panels, new_panel] })
    }

    render() {
        return (
            <div className="root-panels-container">
                { this.state.child_panels }

                <div className="panel-placeholder" onClick={ this.createNewPanel } >
                    <div className="add-icon"><i className="fas fa-plus"></i></div>
                </div>
            </div>
        )
    }
}

RootPanelContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_editmode: state.edit_mode };
}

export default connect(mapStateToProps)(RootPanelContainer);
