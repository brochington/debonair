import _ from "lodash";
import React from "react";

class ProtoComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.dir(this.context);
    }
}

export default ProtoComponent;
