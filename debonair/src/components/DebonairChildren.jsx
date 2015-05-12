import _ from "lodash";
import React from "react";
import Debonair from "../classes/Debonair";
import StyleSheet from "../classes/StyleSheet";

class DebonairChildren extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.shouldUpdate;
    }
    render() {
        let passedProps = {
            debonair: {
                instance: this.props.instance,
                updateStyles: this.props.updateStyles,
                removeStyles: this.props.removeStyles
            }
        };

        let children = React.Children.map(this.props.passedChildren, (child) => {
            return React.cloneElement(child, _.assign(child.props, passedProps));
        });

        return (
            <span>
                {children}
            </span>
        );
    }
};

DebonairChildren.propTypes = {
    passedChildren: (props, propName, componentName) => {
        if(Array.isArray(props)) {
            React.PropTypes.array(props, propName, componentName);
        } else {
            React.PropTypes.element(props, propName, componentName);
        }
    },
    instance: React.PropTypes.instanceOf(Debonair),
    shouldUpdate: React.PropTypes.bool,
    updateStyles: React.PropTypes.func,
    removeStyles: React.PropTypes.func
};

export default DebonairChildren;
