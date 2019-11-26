import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { editmode_select_component, config_delete_component } from "../actions";

// Left panel config for this component
export class DC_Button_CP extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="component-intro-block">
                    <div className="name">Button</div>
                    <div className="description">Used mainly for API calls.</div>
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Text</div>
                    <input type="text" className="ui-input1" placeholder="Button" />
                </div>
            </div>
        )
    }
}

// TODO: @misc component-buttons really should be in another file, as it will be used in every component
// TODO: @misc we should also do something about deleteComponent function, it will be used in every component too
class DC_Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deleted: false
        }

        this.deleteComponent = this.deleteComponent.bind(this);
    }

    deleteComponent() {
        config_delete_component(this.props.component_id, this.props.dispatch);
        this.setState({ deleted: true });
    }

    render() {
        if(this.state.deleted) return false;

        // TODO: @misc This is messy
        let className = "ui-button" + (this.props.type || "1");

        if(this.props.size) {
            className += " " + this.props.size;
        } else {
            className += " bigger";
        }

        if(this.props.color) className += " " + this.props.color;
        if(this.props.emphasis) className += " " + this.props.emphasis;

        return (
            <div
            className="ui-draggable-component"
            >
                <button
                className={ className }
                component_id={ this.props.component_id }
                >
                    { this.props.text || "button" }
                </button>

                <div className="component-buttons">
                    <div
                    className="button"
                    onClick={ () => editmode_select_component(this.props.component_id, this.props.dispatch) }>
                        <i className="fas fa-sliders-h"></i>
                    </div>
                    <div
                    className="button red"
                    onClick={ this.deleteComponent }>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            </div>
        )
    }
}

DC_Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    emphasis: PropTypes.string,

    component_id: PropTypes.string.isRequired,

    dispatch: PropTypes.func.isRequired
}

export default connect()(DC_Button);
