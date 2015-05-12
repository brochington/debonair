import React from "react";
import { Debonair, Styler, components } from "debonair";

let {Div, Span, A } = components;

let flexContainer = {
    display: "flex"
};

let mainContent = {
    border: "solid green 4px",
    width: "60%",
    height: "100px",
    order: 2
};

let flexSide1 = {
    border: "solid purple 4px",
    width: "20%",
    height: "100px",
    flex: 1,
    order: 1

};

let flexSide2 = {
    border: "solid orange 4px",
    width: "20%",
    height: "100px",
    flex: 1,
    order: 3
};

class FlexboxExample extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandler(ev) {
        this.forceUpdate();
    }
    render() {
        return (
            <div>
                <div>
                 Example of Flexbox implementation, mostly to display prefixing.
                </div>
                <Div {...this.props} styles={flexContainer} >
                    <Div {...this.props} styles={mainContent}>
                        <span>mainContent</span>
                    </Div>
                    <Div {...this.props} styles={flexSide1}>
                        <span>Sidebar 1</span>
                    </Div>
                    <Div {...this.props} styles={flexSide2}>
                        <span>Sidebar 2</span>
                    </Div>
                </Div>
            </div>
        );
    }
};

FlexboxExample.propTypes = {
    debonair: React.PropTypes.object
};

FlexboxExample.defaultProps = {
    owner: FlexboxExample
};

export default FlexboxExample;

