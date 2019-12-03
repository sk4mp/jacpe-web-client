import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import DraggableComponent from "../components/DraggableComponent";
import DraggableComponentConfigPanel from "../components/DraggableComponentConfigPanel";

// This is used for both components
function mapStateToProps(state) {
    return { store_config: state.config };
}

// Left panel config for this component
// TODO: @naming
export class _DC_Input_CP extends React.Component {
    constructor(props) {
        super(props);

        // Get component props from redux store
        const component_props = props.store_config.components[props.target_component_id].props || {};

        this.state = {
            component_props
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidUpdate(prev_props) {
        if(prev_props.target_component_id !== this.props.target_component_id) {
            // Different component was selected, update the props
            const component_props = this.props.store_config.components[this.props.target_component_id].props || {};

            this.setState({ component_props });
        }
    }

    onInputChange(event) {
        // TODO: @misc do some checks here
        if(!event.target.name) return false;

        this.setState({ component_props: { ...this.state.component_props, [event.target.name]: event.target.value } });
    }

    render() {
        return (
            <DraggableComponentConfigPanel
            store_config={ this.props.store_config }
            dispatch={ this.props.dispatch }

            component_props={ this.state.component_props }
            target_component_id={ this.props.target_component_id }>
                <div className="component-intro-block">
                    <div className="name">Input Field</div>
                    <div className="description">A basic input field.</div>
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Component name</div>
                    <input
                    type="text"
                    name="api_name"
                    className="ui-input1 monospace"
                    onChange={ this.onInputChange }
                    value={ this.state.component_props.api_name || "" }
                    placeholder="username" />
                    <div className="ui-text small gray"><i className="fas fa-exclamation-circle"></i>
                    This name will be used in API calls.</div>
                </div>

                <div className="ui-spacer dot"></div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Display name</div>
                    <input
                    type="text"
                    name="display_name"
                    className="ui-input1"
                    onChange={ this.onInputChange }
                    value={ this.state.component_props.display_name || "" }
                    placeholder="Username" />
                </div>

                <div className="ui-select-with-name">
                    <div className="ui-input-name1">Input type</div>
                    <select
                    name="input_type"
                    onChange={ this.onInputChange }
                    value={ this.state.component_props.input_type || "" }
                    className="ui-input1">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="url">URL</option>
                        <option value="date">Date</option>
                        <option value="datetime-local">Date and time</option>
                        <option value="month">Month and year</option>
                        <option value="time">Time</option>
                    </select>
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Default value</div>
                    <input
                    type="text"
                    name="default_value"
                    className="ui-input1"
                    onChange={ this.onInputChange }
                    value={ this.state.component_props.default_value || "" }
                    placeholder="foobar" />
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Pattern</div>
                    <input
                    type="text"
                    name="pattern"
                    className="ui-input1 monospace"
                    onChange={ this.onInputChange }
                    value={ this.state.component_props.pattern || "" }
                    placeholder="[A-Za-z]" />
                </div>
            </DraggableComponentConfigPanel>
        )
    }
}

_DC_Input_CP.propTypes = {
    target_component_id: PropTypes.string.isRequired,

    store_config: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export const DC_Input_CP = connect(mapStateToProps)(_DC_Input_CP);

class DC_Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Check if this component has default value
        if( this.props.component_id !== "-1" &&
            this.props.store_config &&
            this.props.store_config.components[this.props.component_id].prop
        ) {
            this.setState({
                value: this.props.store_config.components[this.props.component_id].props.default_value || ""
            });
        }
    }

    onChange(event) {
        const state = {};

        // TODO: @performance Maybe we should do this in onBlur function
        if(!event.target.checkValidity()) state.invalid = true;
        else state.invalid = false;

        state.value = event.target.value;

        this.setState(state);
    }

    render() {
        // TODO: @performance move from here

        // This is the "style" props for this component, if you need to access config_store, component_id, or anything
        // else internal, use this.props instead
        let style_props;

        // Check if this component is in redux store
        if( this.props.component_id !== "-1" && this.props.store_config &&
            this.props.store_config.components[this.props.component_id] ) {
            style_props = this.props.store_config.components[this.props.component_id].props || {};
        } else {
            // This component is not in the redux store, it's styles are probably in this.props
            style_props = this.props;
        }

        return (
            <DraggableComponent component_id={ this.props.component_id }>
                <div className="ui-input-with-name">
                    <div className="ui-input-name1">{ style_props.display_name || "Input field" }</div>
                    <input
                    type={ style_props.input_type || "text" }
                    name={ style_props.api_name }
                    className={ "ui-input1" + (this.state.invalid ? " invalid" : "") }
                    value={ this.state.value }
                    pattern={ style_props.pattern }

                    onChange={ this.onChange } />
                </div>
            </DraggableComponent>
        );
    }
}

DC_Input.propTypes = {
    api_name: PropTypes.string,
    default_value: PropTypes.string,
    pattern: PropTypes.string,

    store_config: PropTypes.object,

    component_id: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(DC_Input);
