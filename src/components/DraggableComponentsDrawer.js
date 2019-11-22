import React from "react";
import PropTypes from "prop-types";

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text", this.props.component_type);

        return true;
    }

    render() {
        return (
            <div className="item" draggable onDragStart={ this.onDragStart }>
                <div className="component">{ this.props.children }</div>
                <div className="name">{ this.props.name }</div>
            </div>
        )
    }
}

Component.propTypes = {
    component_type: PropTypes.string.isRequired,

    name: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

// TODO: @functionality allow horizontal scrolling in the future
export default class DraggableComponentsDrawer extends React.Component {
    render() {
        return (
            <div className="draggable-components-drawer">
                <div className="container">
                    <Component name="Button" component_type="button">
                        <button className="ui-button1 bigger">button</button>
                    </Component>

                    <Component name="Input field" component_type="input">
                        <div className="ui-input-with-name">
                            <div className="ui-input-name1">Input field</div>
                            <input type="text" className="ui-input1" style={ {width:"100px"} } />
                        </div>
                    </Component>

                    <Component name="Container" component_type="horizontal_container">
                        <div className="components-container">
                            <div></div>
                        </div>
                    </Component>
                </div>
            </div>
        )
    }
}
