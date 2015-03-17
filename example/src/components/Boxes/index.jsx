import React from "react";
import { Styler } from "debonair";

class Boxes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <span>This is some boxes!</span>
            </div>
        );
    }
};

Boxes.propTypes = {debonair: React.PropTypes.object};

export default Boxes;
