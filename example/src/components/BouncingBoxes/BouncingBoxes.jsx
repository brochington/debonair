import React from "react";
import { Debonair, Styler, components } from "debonair";

let {Div, Span, A } = components;

let box = Styler.create({
    height: "30px",
    width: "30px",
    backgroundColor: "orange",
    marginTop: "10px",
    display: "block",
    position: "relative",
    hover: {
        backgroundColor: "yellow"
    }
});

let greenBG = {
    backgroundColor: "green"
}

let purpleBG = {
    backgroundColor: "purple"
}

let orangeBG = {
    backgroundColor: "orange"   
}


class BouncingBoxes extends React.Component {
    constructor(props) {
        super(props);
        this.osc = 0;
        this.direction = "right";
    }
    render() {
        this.osc = this.direction == "right" ? this.osc + 5 : this.osc - 5;

        if(this.osc >= (innerWidth - 40)) {
            this.direction = "left";
        }
        if(this.osc <= 0) {
            this.direction = "right";
        }

        return (
            <div>
                <div>Example of animation done by setting stylesheet prop, inline styles, or a combination of both.</div>
                <button onClick={this.props.toggleAnimation}>Start/Stop Animation</button>
                <Div {...this.props} styles={box(greenBG, {left: this.osc + "px"})} />
                <Div {...this.props} styles={box(purpleBG)} style={{left: this.osc + "px"}}/>
                <Div {...this.props} style={box(orangeBG, {left: this.osc + "px"})}/>

            </div>
        );
    }
};

BouncingBoxes.propTypes = {
    debonair: React.PropTypes.object,
    toggleAnimation: React.PropTypes.func
};

BouncingBoxes.defaultProps = {
    owner: BouncingBoxes
};

export default BouncingBoxes;
