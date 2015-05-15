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

        this.state = {
            boxCount: 20
        };
    }
    render() {
        this.osc = this.direction == "right" ? this.osc + 5 : this.osc - 5;

        if(this.osc >= (innerWidth - 40)) {
            this.direction = "left";
        }
        if(this.osc <= 0) {
            this.direction = "right";
        }

        let boxes = [];

        for(let i = 0, l = this.state.boxCount; i<l;i++) {
            boxes.push(<Div key={i} {...this.props} styles={box(greenBG, {left: this.osc + "px"})} />);
            // boxes.push(<Div key={i} {...this.props} style={box(orangeBG, {left: this.osc + "px"})}/>);
        }

        return (
            <div>
                <div>Example of animation done by setting stylesheet prop, inline styles, or a combination of both.</div>
                <div>Number of boxes: <span>{this.state.boxCount}</span></div>
                <input type="number" value={this.state.boxCount} onChange={ev => this.setState({boxCount: ev.target.value})} />
                <button onClick={this.props.toggleAnimation}>Start/Stop Animation</button>
                {boxes}
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
                // <Div {...this.props} styles={box(greenBG, {left: this.osc + "px"})} />
                // <Div {...this.props} styles={box(purpleBG)} style={{left: this.osc + "px"}}/>
                // <Div {...this.props} style={box(orangeBG, {left: this.osc + "px"})}/>