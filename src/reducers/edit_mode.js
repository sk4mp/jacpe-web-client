import {
    EDITMODE_ENTER,
    EDITMODE_LEAVE,
    EDITMODE_SELECT_COMPONENT
} from "../actions";

const INITIAL_STATE = {
    active: false,
    selected_component: undefined
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case EDITMODE_ENTER: {
            return {
                ...state,
                active: true
            }
        }

        case EDITMODE_LEAVE: {
            return {
                ...state,
                active: false
            }
        }

        case EDITMODE_SELECT_COMPONENT: {
            return {
                ...state,
                selected_component: action.component_id
            }
        }

        default:
            return state
    }
}
