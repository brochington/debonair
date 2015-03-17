import React from "react";
import Boxes from "../Boxes";
import {Debonair} from "debonair";

// create a new instance of Debonair.
let debonair = new Debonair();

class Application extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.context);
        return (
            <div>
                <h1>Debonair Examples</h1>
                <Boxes {...this.props} />
            </div>
        );
    }
};

Application.propTypes = {debonair: React.PropTypes.object};
Application.defaultProps = {debonair: debonair};

export default Application;
