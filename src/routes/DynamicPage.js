import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import RootPanelsContainer from "../components/RootPanelsContainer";
import DraggableComponentsDrawer from "../components/DraggableComponentsDrawer";

import "./DynamicPage.css";

class DynamicPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            root_panel_containers_count: 1
        }

        this.createRootContainer = this.createRootContainer.bind(this);
    }

    createRootContainer() {
        this.setState({ root_panel_containers_count: this.state.root_panel_containers_count + 1 })
    }

    render() {
        const containers = [];

        for(let i = 0; i < this.state.root_panel_containers_count; i++) {
            containers.push(<RootPanelsContainer key={ i } />);
        }

        return (
            <div className={ "route dynamic-page" + (this.props.store_editmode.active ? " edit-mode" : "") }>
                { containers }

                <RootPanelsContainer
                key={ this.state.root_panel_containers_count + 1 }
                new_contaier
                hidden={ !this.props.store_editmode.active }
                onClick={ this.createRootContainer } />

                <DraggableComponentsDrawer />
            </div>
        );
    }
}

DynamicPage.propTypes = {
    store_editmode: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { store_editmode: state.edit_mode };
}

export default connect(mapStateToProps)(DynamicPage);
