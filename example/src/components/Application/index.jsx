import React from "react";
import BoxPage from "../BoxPage";
import Circles from "../Circles";
import Random from "../Random";
import FlexboxExample from "../FlexboxExample";
import BouncingBoxes from "../BouncingBoxes";
import { Debonair, Styler, DebonairApp } from "debonair";

let debonairInstance = new Debonair({
    mediaQueries: {
        tablet: "(max-width: 768px)"
    }
});

class Application extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DebonairApp instance={debonairInstance}>
                <Random />
                <BoxPage />
                <FlexboxExample />
                <BouncingBoxes />
            </DebonairApp>
        );
    }
};

export default Application;