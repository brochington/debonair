import _ from "lodash";
import React from "react";

class DebonairApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <span>{this.props.children}</span>;
    }
}

export default DebonairApp;
