import _ from "lodash";
import React from "react";
import ProtoComponent from "./ProtoComponent";

class Div extends ProtoComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div {...this.props} >{this.props.children}</div>
        )
    }
}

class A extends ProtoComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a {...this.props} >{this.props.children}</a>
        )
    }
}

class Span extends ProtoComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span {...this.props} >{this.props.children}</span>
        )
    }
}

export default { 
    Div, 
    A,
    Span
};