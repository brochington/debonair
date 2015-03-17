import React from "react";
import { Styler } from "debonair";

let myStyler = Styler.create({
    height: 100,
    width: 100,
    backgroundColor: "green"
});

let testStyler1 = Styler.create(() => {
    return {
        height: 1,
        width: 1,
        border: "solid violet 2px"
    };
});

console.log("testStyler1");
console.dir(testStyler1);
console.log(testStyler1());

// let styler2 = Styler.create([{
//         height: 200,
//         width: 200
//     },{
//         backgroundColor: "orange"
//     }, currentStyles => {
//         return {border: "solid black 2px", height: 400};
//     }, myStyler
// ]);

let styler3 = Styler.create({
        height: 200,
        width: 200
    },{
        backgroundColor: "orange"
    }, currentStyles => {
        return {border: "solid yellow 3px", height: 400};
    }, myStyler, [{display: "block"}, {padding: 10}, {padding: 20}]);

let stylerVal = styler3();

console.log("stylerVal");
console.dir(styler3);
console.log(stylerVal);

// console.log(myStyler());

// console.log(styler2({display: "block"}));

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
