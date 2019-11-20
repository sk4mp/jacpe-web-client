import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DraggablePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            child_components: []
        }
    }

    // Component mounted, get the config from `config` redux store
    componentDidMount() {
        const panel_config = this.props.store_config.panels[this.props.panel_id];

        let new_state = this.state;

        // Add child components
        new_state.child_components = panel_config.child_components;

        // Apply the new state
        this.setState(new_state);
    }

    render() {
        return (
            <div className="draggable-panel" panel_id={ this.props.panel_id }>
                { this.state.child_components }
            </div>
        )
    }
}

DraggablePanel.propTypes = {
    panel_id: PropTypes.string.isRequired,

    store_config: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { store_config: state.config };
}

export default connect(mapStateToProps)(DraggablePanel);
