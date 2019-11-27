import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import ComponentTypeSelector, { Section, Option } from "../components/ComponentTypeSelector";

import { editmode_select_component, config_delete_component } from "../actions";

// Left panel config for this component
export class DC_Button_CP extends React.Component {
    constructor(props) {
        super(props);

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
    }

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

                <ComponentTypeSelector preview_component={ DC_Button }>
                    <Section key_name="size" default="bigger" name="Size" icon={ <i className="fas fa-ruler"></i> }>
                        <Option value="small" text="Small" />
                        <Option value="bigger" text="Default" />
                        <Option value="big" text="Big" />
                    </Section>
                    <Section key_name="emphasis" default="normal" name="Type" icon={ <i className="fas fa-cubes"></i> }>
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
