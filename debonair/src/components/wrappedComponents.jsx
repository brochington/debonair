import _ from "lodash";
import React from "react";
import ProtoComponent from "./ProtoComponent";

class Div extends ProtoComponent {
    constructor(props) {
        super(props);
    }
    callRef(stuff) {
        // this is pretty cool, will you need it?
    }
    render() {
        // TODO: Need to make sure that class names are concatenated with the cssId
        return (
            <div ref={this.callRef()} className={this.cssId} {...this.props} >{this.props.children}</div>
        )
    }
}

class A extends ProtoComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a className={this.cssId} {...this.props} >{this.props.children}</a>
        )
    }
}

class Span extends ProtoComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span className={this.cssId} {...this.props} >{this.props.children}</span>
        )
    }
}

export default { 
    Div, 
    A,
    Span
};