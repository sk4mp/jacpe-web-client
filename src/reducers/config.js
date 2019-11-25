import {
    CONFIG_ADD_PANEL,
    CONFIG_DELETE_PANEL,
    CONFIG_DELETE_COMPONENT,
    CONFIG_EDIT_COMPONENT,
    CONFIG_COMPONENT_EDIT_CHILDREN,
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

        case CONFIG_DELETE_PANEL: {
            let new_components_object = state.components;

            // Delete all components of this panel
            for(const component_id of state.panels[action.panel_id].child_components) {
                // Check if component is a container (i.e. also has child components)
                if(new_components_object[component_id] && new_components_object[component_id].child_components) {
                    // Delete all child components of the conteiner assigned to the panel that is to be deleted
                    for(const child_component_id of new_components_object[component_id].child_components) {
                        delete new_components_object[child_component_id];
                    }
                }

                delete new_components_object[component_id];
            }

            return {
                ...state,
                panels: { ...state.panels, [action.panel_id]: false },
                components: new_components_object
            }
        }

        case CONFIG_DELETE_COMPONENT: {
            let new_components_object = state.components;

            // Check if component is a container (i.e. has child components)
            if(new_components_object[action.component_id] &&
            new_components_object[action.component_id].child_components) {
                // Delete all child components of the conteiner
                for(const child_component_id of new_components_object[action.component_id].child_components) {
                    delete new_components_object[child_component_id];
                }
            }

            delete new_components_object[action.component_id];

            return {
                ...state,
                components: new_components_object
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
        case CONFIG_EDIT_COMPONENT: {
            return {
                ...state,
                components: {
                    ...state.components,
                    [action.component_object.element.props.component_id]: action.component_object
                }
            }
        }

        // TODO: @performance Maybe we should do it in a different way
        case CONFIG_COMPONENT_EDIT_CHILDREN: {
            return {
                ...state,
                components: {
                    ...state.components,
                    [action.component_id]: {
                        ...state.components[action.component_id],
                        child_components: action.child_components
                    }
                }
            }
        }

        default:
            return state
    }
}
