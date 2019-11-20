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
