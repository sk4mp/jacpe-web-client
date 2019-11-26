import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { editmode_select_component, config_delete_component } from "../actions";

// Left panel config for this component
export class DC_Input_CP extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="component-intro-block">
                    <div className="name">Input Field</div>
                    <div className="description">A basic input field.</div>
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Component name</div>
                    <input type="text" className="ui-input1 monospace" placeholder="username" />
                    <div className="ui-text small gray"><i className="fas fa-exclamation-circle"></i>
                    This name will be used in API calls.</div>
                </div>

                <div className="ui-select-with-name">
                    <div className="ui-input-name1">Input type</div>
                    <select className="ui-input1">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="url">URL</option>
                    </select>
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Default value</div>
                    <input type="text" className="ui-input1" placeholder="foobar" />
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Pattern</div>
                    <input type="text" className="ui-input1 monospace" placeholder="[A-Za-z]" />
                </div>
            </div>
        )
    }
}

// TODO: @misc component-buttons really should be in another file, as it will be used in every component
// TODO: @misc we should also do something about deleteComponent function, it will be used in every component too
class DC_Input extends React.Component {
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

        return (
            <div
            className="ui-draggable-component"
            >
                <div component_id={ this.props.component_id } className="ui-input-with-name">
                    <div className="ui-input-name1">Some input</div>
                    <input type="text" className="ui-input1" />
                </div>

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

DC_Input.propTypes = {
    component_id: PropTypes.string.isRequired,

    dispatch: PropTypes.func.isRequired
}

export default connect()(DC_Input);
