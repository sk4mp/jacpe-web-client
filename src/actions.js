import React from "react";

import DraggablePanel from "./components/DraggablePanel";

export const EDITMODE_ENTER = "EDITMODE_ENTER";
export function editmode_enter(dispatch) {
    dispatch({ type: EDITMODE_ENTER });
}

export const EDITMODE_LEAVE = "EDITMODE_LEAVE";
export function editmode_leave(dispatch) {
    dispatch({ type: EDITMODE_LEAVE });
}

// TODO: @misc add something like an interface for panel_object
export const CONFIG_EDIT_PANEL = "CONFIG_EDIT_PANEL";
export function config_edit_panel(panel_object, dispatch) {
    dispatch({ type: CONFIG_EDIT_PANEL, panel: panel_object });
}

// Create a new panel, add to `config` redux store and return a React element
export function config_create_panel(dispatch) {
    const panel_id = Math.floor(Math.random() * 9999999999).toString();

    const panel_object = {
        id: panel_id,
        child_components: []
    }

    // TODO: @placeholder
    // This later will be changed into something like <DC_Button />, <DC_InputWName />, <DC_ComponentsContainer />, etc.
    panel_object.child_components = [
        <div key="1" className="ui-input-with-name">
            <div className="ui-input-name1">Some input</div>
            <input type="text" className="ui-input1" />
        </div>,
        <button key="2" className="ui-button1 bigger red">discard</button>,
        <button key="3" className="ui-button1 bigger outlined red">action</button>,
        <button key="4" className="ui-button2">action</button>,
        <button key="5" className="ui-button1 bigger low-emp">action</button>,
        <button key="6" className="ui-button1 bigger">save</button>
    ]

    // Add a panel to the store
    dispatch({ type: CONFIG_EDIT_PANEL, panel: panel_object });

    // Create a React element
    const new_panel_el = <DraggablePanel key={ panel_id } panel_id={ panel_id } />

    return new_panel_el;
}
