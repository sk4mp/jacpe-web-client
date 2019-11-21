import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import RootPanelsContainer from "../components/RootPanelsContainer";
import DraggableComponentsDrawer from "../components/DraggableComponentsDrawer";

import "./DynamicPage.css";

class DynamicPage extends React.Component {
    render() {
        return (
            <div className={ "route dynamic-page" + (this.props.store_editmode.active ? " edit-mode" : "") }>
                <RootPanelsContainer />
                <RootPanelsContainer />

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
