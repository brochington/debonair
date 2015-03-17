import _ from "lodash";

class Styler {
    constructor() {
        console.log("styler constructor");
    }
    createStyler() {
        let styler = stylerContructor(initVal, this),
            func = styler._getStyles;

        Object.assign(func, styler);

        Object.defineProperty(styler, "styler", {
            enumerable: true,
            value: func
        });

        return func.bind(func);
    }
}

export default Debonair;
