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

        this.setState({ child_panels: [...this.state.child_panels, new_panel] });

        // Call parent's onClick
        this.props.onClick && this.props.onClick();
    }

    render() {
        return (
            <div className={"root-panels-container" + (this.props.hidden ? " hidden" : "")}>
                { this.state.child_panels }

                <div className="panel-placeholder"
                onClick={ this.createNewPanel } >
                    { this.props.new_contaier
                    ? <div className="add-icon"><i className="fas fa-chevron-right"></i></div>
                    : <div className="add-icon"><i className="fas fa-plus"></i></div> }
                </div>
            </div>
        );
    }
}

RootPanelContainer.propTypes = {
    onClick: PropTypes.func,
    new_contaier: PropTypes.bool,
    hidden: PropTypes.bool,

    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_editmode: state.edit_mode };
}

export default connect(mapStateToProps)(RootPanelContainer);
