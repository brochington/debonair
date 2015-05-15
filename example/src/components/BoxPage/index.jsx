import React from "react";
import { Debonair, Styler, components } from "debonair";

let {Div, Span, A } = components;

let styles = Styler.create({
    color: "green"
});

let box = Styler.create({
    height: "20px",
    width: "20px",
    border: "solid black 1px",
    backgroundColor: "blue",
    margin: "10px",
    display: "inline-block",
    hover: {
        backgroundColor: "black",
        height: "150px"
    },
    transition: {
        property: "background-color",
        duration: "1s",
        callback: (ev) => {
            console.log("transition callback!!", ev);
        }
    }
    // transition: "all 1s"
});

class BoxPage extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandler(ev) {
        this.forceUpdate();
    }
    render() {
        let boxes = [];

        for(let i = 0; i<50 ;i++) {
            let bgdColor = {backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16)};

            boxes.push(<Div {...this.props} styles={box(bgdColor)}
                                            key={`box-${i}-${Math.random()}`}
                                            onClick={this.clickHandler.bind(this)}/>);
        }
        
        return (
            <Div {...this.props} >
                <div>Boxes have hover state. click on one to change colors</div>
                {boxes}
            </Div>
        );
    }
};

BoxPage.propTypes = {
    debonair: React.PropTypes.object
};

BoxPage.defaultProps = {
    owner: BoxPage
};

export default BoxPage;

