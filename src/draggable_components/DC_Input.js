import React from "react";
import PropTypes from "prop-types";

import DraggableComponent from "../components/DraggableComponent";

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

export default class DC_Input extends React.Component {
    render() {
        return (
            <DraggableComponent component_id={ this.props.component_id }>
                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Some input</div>
                    <input type="text" className="ui-input1" />
                </div>
            </DraggableComponent>
        )
    }
}

DC_Input.propTypes = {
    component_id: PropTypes.string.isRequired
}
