import {
    CONFIG_EDIT_PANEL
} from "../actions";

const INITIAL_STATE = {
    panels: {}
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        // TODO: @performance Maybe we should do it in a different way
        case CONFIG_EDIT_PANEL: {
            return {
                ...state,
                panels: { ...state.panels, [action.panel.id]: action.panel }
            }
        }

        default:
            return state
    }
}
