import React from "react";

// TODO: @placeholder
export default class DraggablePanel extends React.Component {
    render() {
        return (
            <div className="draggable-panel">
                <div className="ui-input-with-name">
                    <div className="ui-input-name1">Some input</div>
                    <input type="text" className="ui-input1" />
                </div>

                <button className="ui-button1 bigger red">discard</button>
                <button className="ui-button1 bigger outlined red">action</button>
                <button className="ui-button2">action</button>
                <button className="ui-button1 bigger low-emp">action</button>
                <button className="ui-button1 bigger">save</button>
            </div>
        )
    }
}
