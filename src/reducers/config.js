import {
    CONFIG_ADD_PANEL,
    CONFIG_ADD_COMPONENT,
    CONFIG_PANEL_ADD_COMPONENT
} from "../actions";

const INITIAL_STATE = {
    panels: {},
    components: {}
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        // TODO: @performance Maybe we should do it in a different way
        case CONFIG_ADD_PANEL: {
            return {
                ...state,
                panels: { ...state.panels, [action.panel.id]: action.panel }
            }
        }

        // TODO: @performance Maybe we should do it in a different way
        case CONFIG_PANEL_ADD_COMPONENT: {
            return {
                ...state,
                panels: {
                    ...state.panels,
                    [action.panel_id]: {
                        ...state.panels[action.panel_id],
                        child_components: [ ...state.panels[action.panel_id].child_components, action.component_id ]
                    }
                }
            }
        }

        // TODO: @performance Maybe we should do it in a different way
        case CONFIG_ADD_COMPONENT: {
            return {
                ...state,
                components: { ...state.components, [action.component.element.key]: action.component }
            }
        }

        default:
            return state
    }
}
