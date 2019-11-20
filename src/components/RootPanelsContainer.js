import React from "react";

import DraggablePanel from "./DraggablePanel";

export default class RootPanelContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            child_panels: []
        }

        this.createNewPanel = this.createNewPanel.bind(this);
    }

    createNewPanel() {
        // Create a new panel with random id
        // TODO: @misc @placeholder This should be in a different file
        // TODO: @misc Generate a random string rather than a number
        const new_id = Math.floor(Math.random() * 9999999999).toString();

        const new_panel = <DraggablePanel key={ new_id } panel_id={ new_id } />

        this.setState({ child_panels: [...this.state.child_panels, new_panel] })
    }

    render() {
        return (
            <div className="root-panels-container">
                { this.state.child_panels }

                <div className="panel-placeholder" onClick={ this.createNewPanel } >
                    <div className="add-icon"><i className="fas fa-plus"></i></div>
                </div>
            </div>
        )
    }
}
