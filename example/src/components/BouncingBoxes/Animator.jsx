import React from "react";
import BouncingBoxes from "./BouncingBoxes";
import { Debonair, Styler, components } from "debonair";

let {Div, Span, A } = components;

class Animator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: true
        };
    }
    componentDidMount() {
        this.cancelFrame = requestAnimationFrame(this.updateFrame.bind(this));
    }
    updateFrame() {
        if(this.state.animate) {
            this.cancelFrame = requestAnimationFrame(this.updateFrame.bind(this));
            this.forceUpdate();    
        } else {
            cancelAnimationFrame(this.cancelFrame);    
        }
    }
    toggleAnimation() {
        this.setState({animate: !this.state.animate});
        this.cancelFrame = requestAnimationFrame(this.updateFrame.bind(this));
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.cancelFrame);
    }
    render() { 
        return <BouncingBoxes {...this.props} toggleAnimation={this.toggleAnimation.bind(this)}/>;
    }
};

Animator.propTypes = {
    debonair: React.PropTypes.object
};

Animator.defaultProps = {
    owner: Animator
};

export default Animator;
