import React from "react";
import { components } from "debonair";

let { A } = components;

let styles = {
    color: "black",
    fontSize: "30px",
    cursor: "pointer",
    position: "relative",
    hover: {
        color: "blue"
    },
    tablet: {
        color: "orange"
    },
    animate: {
        direction: "alternate",
        duration: "3s",
        iterationCount: "infinite",
        name: "testAnimation"
    },
    keyframes: {
        name: "testAnimation",
        from: {
            left: "30px"
        },
        to: {
            left: "200px"
        }
    }
}

class Random extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    hover over text below to change color. reduce screen width to test media query. Animation is done with CSS animations.
                </div>
                <A {...this.props} styles={styles}>
                  Hello there!  
                </A>
            </div>
        );
    }
};

Random.propTypes = {
    debonair: React.PropTypes.object
};

Random.defaultProps = {
    owner: Random
};

export default Random;
