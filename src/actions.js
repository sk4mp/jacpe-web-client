import React from "react";

import { generateRandomId } from "./tools";

import DraggablePanel from "./components/DraggablePanel";

// We probably should use this functions only outside this file, they are just wrappers

export const EDITMODE_ENTER = "EDITMODE_ENTER";
export function editmode_enter(dispatch) {
    dispatch({ type: EDITMODE_ENTER });
}

export const EDITMODE_LEAVE = "EDITMODE_LEAVE";
export function editmode_leave(dispatch) {
    dispatch({ type: EDITMODE_LEAVE });
}

// Add a new panel
// TODO: @misc add something like an interface for panel_object
export const CONFIG_ADD_PANEL = "CONFIG_ADD_PANEL";
export function config_add_panel(panel_object, dispatch) {
    dispatch({ type: CONFIG_ADD_PANEL, panel: panel_object });
}

// Assign component to the panel (component must be registered using CONFIG_ADD_COMPONENT)
export const CONFIG_PANEL_ADD_COMPONENT = "CONFIG_PANEL_ADD_COMPONENT";
export function config_panel_add_component(panel_id, component_id, dispatch) {
    dispatch({ type: CONFIG_PANEL_ADD_COMPONENT, panel_id, component_id });
}

// Add component to the store
export const CONFIG_ADD_COMPONENT = "CONFIG_ADD_COMPONENT";
export function config_add_component(component, dispatch) {
    dispatch({ type: CONFIG_ADD_COMPONENT, component });
}

// Create a new panel, add to `config` redux store and return a React element
export function config_create_panel(dispatch) {
    const panel_id = generateRandomId();

    const panel_object = {
        id: panel_id,
        child_components: []
    }

    // Add a panel to the store
    dispatch({ type: CONFIG_ADD_PANEL, panel: panel_object });

    // Create a React element
    const new_panel_el = <DraggablePanel key={ panel_id } panel_id={ panel_id } />

    return new_panel_el;
}

// Assign component to the panel
// TODO: @misc passing the whole panel object is a bit messy, an id would be nicer
export function config_assign_component(component, panel, dispatch) {
    const component_object = {
        element: component,
        panel_id: panel.id
    }

    // TODO: @misc not sure if this is the best way to do this
    dispatch({ type: CONFIG_ADD_COMPONENT, component: component_object });
    dispatch({ type: CONFIG_PANEL_ADD_COMPONENT, panel_id: panel.id, component_id: component.props.component_id });
}
