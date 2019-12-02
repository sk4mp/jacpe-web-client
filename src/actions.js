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

export const EDITMODE_SELECT_COMPONENT = "EDITMODE_SELECT_COMPONENT";
export function editmode_select_component(component_id, dispatch) {
    dispatch({ type: EDITMODE_SELECT_COMPONENT, component_id });
}

// Add a new panel
// TODO: @misc We should have an interface for component object
export const CONFIG_ADD_PANEL = "CONFIG_ADD_PANEL";
export function config_add_panel(panel_object, dispatch) {
    dispatch({ type: CONFIG_ADD_PANEL, panel: panel_object });
}

// Delete a panel
export const CONFIG_DELETE_PANEL = "CONFIG_DELETE_PANEL";
export function config_delete_panel(panel_id, dispatch) {
    dispatch({ type: CONFIG_DELETE_PANEL, panel_id });
}

// Delete a component
export const CONFIG_DELETE_COMPONENT = "CONFIG_DELETE_COMPONENT";
export function config_delete_component(component_id, dispatch) {
    dispatch({ type: CONFIG_DELETE_COMPONENT, component_id });
}

// Assign component to the panel (component must be registered using CONFIG_ADD_COMPONENT)
export const CONFIG_PANEL_ADD_COMPONENT = "CONFIG_PANEL_ADD_COMPONENT";
export function config_panel_add_component(panel_id, component_id, dispatch) {
    dispatch({ type: CONFIG_PANEL_ADD_COMPONENT, panel_id, component_id });
}

// Add/edit component in the store
export const CONFIG_EDIT_COMPONENT = "CONFIG_EDIT_COMPONENT";
export function config_edit_component(component_object, dispatch) {
    dispatch({ type: CONFIG_EDIT_COMPONENT, component_object });
}

// Set children for a component (used in DC_Container)
export const CONFIG_COMPONENT_EDIT_CHILDREN = "CONFIG_COMPONENT_EDIT_CHILDREN";
export function config_component_edit_children(component_id, child_components, dispatch) {
    dispatch({ type: CONFIG_COMPONENT_EDIT_CHILDREN, component_id, child_components });
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
export function config_assign_component(component_el, component_type, panel_id, dispatch) {
    // TODO: @misc We should have an interface for component object
    const component_object = {
        element: component_el,
        type: component_type,
        panel_id: panel_id
    }

    console.log(component_el.props);

    // TODO: @misc not sure if this is the best way to do this
    dispatch({ type: CONFIG_EDIT_COMPONENT, component_object });
    dispatch({ type: CONFIG_PANEL_ADD_COMPONENT, panel_id, component_id: component_el.props.component_id });
}
