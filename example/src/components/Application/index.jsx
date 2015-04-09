import React from "react";
import Boxes from "../Boxes";
import {Debonair, components, DebonairApp} from "debonair";

console.dir(DebonairApp);

// create a new instance of Debonair.
let debonair = new Debonair();

class Application extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DebonairApp>
                    <h1>Debonair Examples</h1>
                    <Boxes {...this.props} />
            </DebonairApp>
        );
    }
};

Application.propTypes = {debonair: React.PropTypes.object};
Application.defaultProps = {debonair: debonair};

export default Application;
