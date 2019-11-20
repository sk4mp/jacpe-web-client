import {
    EDITMODE_ENTER,
    EDITMODE_LEAVE
} from "../actions";

const INITIAL_STATE = {
    active: false
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

        default:
            return state
    }
}
