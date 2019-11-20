import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { editmode_enter, editmode_leave } from "../actions";

import "./TopPanel.css";

class TopPanel extends React.Component {
    constructor(props) {
        super(props);

        this.switchEditmode = this.switchEditmode.bind(this);
    }

    switchEditmode() {
        if(this.props.store_editmode.active) editmode_leave(this.props.dispatch);
        else editmode_enter(this.props.dispatch);
    }

    render() {
        return (
            <div id="top-panel">
                <div className="left"></div>
                <div className="middle"></div>
                <div className="right">
                    <div className="buttons">
                        <div className={"button ui-tooltip-container" + (this.props.store_editmode.active ? " active" : "")} onClick={ this.switchEditmode }>
                            <i className="material-icons">edit</i>

                            <div className="ui-tooltip bottom">{ this.props.store_editmode.active ? "Leave edit mode" : "Enter edit mode" }</div>
                        </div>
                    </div>
                    <div className="user-avatar"></div>
                </div>
            </div>
        )
    }
}

TopPanel.propTypes = {
    store_editmode: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { store_editmode: state.edit_mode };
}

export default connect(mapStateToProps)(TopPanel);
