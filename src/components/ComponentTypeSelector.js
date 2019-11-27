import React from "react";
import PropTypes from "prop-types";

import "./ComponentTypeSelector.css";

export class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.default
        };

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(value) {
        this.setState({ selected: value });

        // Bubble the change
        this.props.onChange(this.props.key_name, value);
    }

    // TODO: @performance maybe?
    render() {
        let options = [];
        let option;

        for(const i in this.props.children) {
            option = this.props.children[i];

            options.push(React.cloneElement(option, {
                key: option.props.value,
                selected: this.state.selected === option.props.value,
                onClick: () => { this.onSelect(this.props.children[i].props.value) }
            }));
        }

        return (
            <div className={ "section" + (this.props.open ? " open" : "") }>
                <div className="name" onClick={ this.props.onClick }>{ this.props.icon } { this.props.name }</div>
                <div className="name-arrow"><i className="fas fa-chevron-down"></i></div>
                <div className="container">
                    { options }
                </div>
            </div>
        );
    }
}

Section.propTypes = {
    key_name: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    name: PropTypes.string.isRequired,
    default: PropTypes.string,

    children: PropTypes.array.isRequired,
    open: PropTypes.bool,

    // We shouldn't put .isRequired here because these props will be given to the element by ComponentTypeSelector
    onChange: PropTypes.func,
    onClick: PropTypes.func
}

export function Option(props) {
    return (
        <div
        className={ "option" + (props.selected ? " selected" : "") }
        onClick={ props.onClick }>
            <div>
                <div className="tick"></div> { props.text }
            </div>
            <div className="custom-icon">{ props.custom_icon }</div>
        </div>
    )
}

Option.propTypes = {
    text: PropTypes.string.isRequired,
    custom_icon: PropTypes.element,

    // We shouldn't put .isRequired here because these props will be given to the element by Section component
    selected: PropTypes.bool,
    onClick: PropTypes.func,
}

export default class ComponentTypeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            PreviewComponent: () => false,
            preview_component_props: { component_id: "-1", dispatch: () => false },

            opened_section: undefined
        }

        // Get the preview component
        if(this.props.preview_component) {
            this.state.PreviewComponent = this.props.preview_component;
        }

        this.onSectionClick = this.onSectionClick.bind(this);
    }

    onSectionClick(section_key_name) {
        let new_section_name = section_key_name;

        if(section_key_name === this.state.opened_section) {
            new_section_name = undefined;
        }

        this.setState({ opened_section: new_section_name });
    }

    // TODO: @performance maybe?
    render() {
        let sections = [];
        let section;

        for(const i in this.props.children) {
            section = this.props.children[i];

            sections.push(React.cloneElement(section, {
                key: section.props.key_name,
                open: this.state.opened_section === section.props.key_name,
                onChange: (key, value) => {
                    let new_props = this.state.preview_component_props;
                    new_props[key] = value;

                    this.setState({ preview_component_props: new_props })
                },
                onClick: () => this.onSectionClick(this.props.children[i].props.key_name)
            }));
        }

        return (
            <div className="component-type-selector">
                <div className="preview-window">
                    <this.state.PreviewComponent { ...this.state.preview_component_props } />
                </div>

                { sections }
            </div>
        )
    }
}

ComponentTypeSelector.propTypes = {
    preview_component: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
}
