import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import DraggableComponent from "../components/DraggableComponent";
import DraggableComponentConfigPanel from "../components/DraggableComponentConfigPanel";

import ComponentTypeSelector, { Section, Option } from "../components/ComponentTypeSelector";

// This is used for both components
function mapStateToProps(state) {
    return { store_config: state.config };
}

// Left panel config for this component
// TODO: @naming
class _DC_Button_CP extends React.Component {
    constructor(props) {
        super(props);

        // Get component props from redux store
        const component_props = props.store_config.components[props.target_component_id].props || {};

        this.state = {
            component_props
        }

        const icon_color_style = {
            width: 8,
            height: 8,
            borderRadius: 3
        }

        this.icon_color_red = {
            ...icon_color_style,
            backgroundColor: "var(--color-red)"
        }

        this.icon_color_blue = {
            ...icon_color_style,
            backgroundColor: "var(--color-blue)"
        }

        const icon_type = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            width: 14,
            height: 14,
            borderRadius: 3,

            fontSize: 10,
        }

        this.icon_type_normal = {
            ...icon_type,
            color: "rgba(255, 255, 255, 0.95)",
            fontWeight: 500,
            backgroundColor: "var(--color-blue)"
        }

        this.icon_type_outlined = {
            ...icon_type,
            color: "var(--color-blue)",
            fontWeight: 500,
            boxSizing: "border-box",
            border: "1px solid var(--color-blue)"
        }

        this.icon_type_lowemp = {
            ...icon_type,
            color: "var(--color-blue)",
            fontWeight: 500,
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onTypeSelectorChange = this.onTypeSelectorChange.bind(this);
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

    onTypeSelectorChange(ts_props) {
        // TODO: @performace
        this.setState({ component_props: { ...this.state.component_props, ...ts_props } })
    }

    render() {
        return (
            <DraggableComponentConfigPanel
            store_config={ this.props.store_config }
            dispatch={ this.props.dispatch }

            component_props={ this.state.component_props }
            target_component_id={ this.props.target_component_id }>
                <div className="component-intro-block">
                    <div className="name">Button</div>
                    <div className="description">Used mainly for API calls.</div>
                </div>

                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Text</div>
                    <input
                    type="text"
                    name="text"
                    className="ui-input1"
                    onChange={ this.onInputChange }
                    value={ this.state.component_props.text || "" }
                    placeholder="Button" />
                </div>

                <ComponentTypeSelector
                onChange={ this.onTypeSelectorChange }
                preview_component={ DC_Button }
                default_props={ this.state.component_props }>
                    <Section key_name="size" default="bigger" name="Size" icon={ <i className="fas fa-ruler"></i> }>
                        <Option value="small" text="Small" />
                        <Option value="bigger" text="Default" />
                        <Option value="big" text="Big" />
                    </Section>
                    <Section key_name="emphasis" default="normal" name="Type"
                    icon={ <i className="fas fa-swatchbook"></i> }>
                        <Option value="normal" text="Normal" custom_icon={
                            <div style={ this.icon_type_normal }>A</div>
                        } />
                        <Option value="outlined" text="Outlined" custom_icon={
                            <div style={ this.icon_type_outlined }>A</div>
                        } />
                        <Option value="low-emp" text="Low emphasis" custom_icon={
                            <div style={ this.icon_type_lowemp }>A</div>
                        } />
                    </Section>
                    <Section key_name="color" default="blue" name="Color" icon={ <i className="fas fa-palette"></i> }>
                        <Option value="blue" text="Blue" custom_icon={ <div style={ this.icon_color_blue }></div> } />
                        <Option value="red" text="Red" custom_icon={ <div style={ this.icon_color_red }></div> } />
                    </Section>
                </ComponentTypeSelector>
            </DraggableComponentConfigPanel>
        );
    }
}

_DC_Button_CP.propTypes = {
    target_component_id: PropTypes.string.isRequired,

    store_config: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export const DC_Button_CP = connect(mapStateToProps)(_DC_Button_CP);

class DC_Button extends React.Component {
    render() {
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

        // TODO: @misc This is messy
        let className = "ui-button" + (style_props.type || "1");

        if(style_props.size) {
            className += " " + style_props.size;
        } else {
            className += " bigger";
        }

        if(style_props.color) className += " " + style_props.color;
        if(style_props.emphasis) className += " " + style_props.emphasis;

        return (
            <DraggableComponent component_id={ this.props.component_id }>
                <button
                className={ className }
                >
                    { style_props.text || "button" }
                </button>
            </DraggableComponent>
        )
    }
}

DC_Button.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    emphasis: PropTypes.string,

    store_config: PropTypes.object,

    component_id: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(DC_Button);
