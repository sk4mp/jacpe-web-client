import React from "react";

import DC_Button from "./draggable_components/DC_Button";
import DC_Input from "./draggable_components/DC_Input";
import DC_Container from "./draggable_components/DC_Container";

export function generateRandomId() {
    return Math.floor(Math.random() * 9999999999).toString();
}

// TODO: @high @performance It's a better idea to insted get a react component function, instead of a component.
// Like this: `return DC_Button`, instead of `return <DC_Button id="..." />`
export function createDraggableComponentFromType(type, panel_id) {
    const id = generateRandomId();

    switch(type) {
        case "button":
            return <DC_Button key={ id } component_id={ id } />

        case "input":
            return <DC_Input key={ id } component_id={ id } />

        case "horizontal_container":
            return <DC_Container key={ id } component_id={ id } panel_id={ panel_id } />

        default:
            return false;
    }
}
