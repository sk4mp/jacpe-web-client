import React from "react";

import DC_Button from "./draggable_components/DC_Button";

export function createDraggableComponentFromType(type, id) {
    // Generate a new id
    if(!id) id = generateRandomId();

    switch(type) {
        case "button":
            return <DC_Button key={ id } component_id={ id } />

        default:
            return false;
    }
}

export function generateRandomId() {
    return Math.floor(Math.random() * 9999999999).toString();
}
