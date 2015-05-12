import React from "react";
import { Debonair, Styler, components } from "debonair";

let {Div, Span, A } = components;

let circle = Styler.create({
    height: "20px",
    width: "20px",
    border: "solid black 1px",
    backgroundColor: "blue",
    borderRadius: "11px",
    margin: "10px",
    display: "inline-block",
    hover: {
        backgroundColor: "orange"
    },
    active: {
        backgroundColor: "green"
    }
});

class Circles extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let circles = [];

        for(let i = 0; i<20;i++) {
            let bgdColor = {backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16)};

            circles.push(<Div {...this.props} styles={circle(bgdColor)} key={`circle-${i}`}/>);
        }
        
        return (
            <Div {...this.props}>
                {circles}
            </Div>
        );
    }
};

Circles.propTypes = {
    debonair: React.PropTypes.object
};

Circles.defaultProps = {
    owner: Circles
};

export default Circles;
