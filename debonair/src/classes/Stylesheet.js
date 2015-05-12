import _ from "lodash";
import Im from "immutable";

const states = [
    "hover",
    "active"
];

const propHandlers = {
    flex(stylesObj) {
        let styles = stylesObj.flex;

        return `-webkit-box-flex:${styles};-moz-box-flex:${styles};-webkit-flex:${styles};flex:${styles};`;
    },
    order(stylesObj) {
        let styles = stylesObj.order;
        return `-webkit-box-ordinal-group: ${styles};-moz-box-ordinal-group: ${styles};-ms-flex-order: ${styles};-webkit-order: ${styles};order: ${styles};`;
    },
    animate(stylesObj) {
        let animationStyleString = "";
        let styles = stylesObj.animate;
        styles.name = styles.name;

        for(let key in styles) {
            animationStyleString += `animation-${_.kebabCase(key)}:${styles[key]}; `;
        }

        return animationStyleString;
    }
}

class Stylesheet {
    constructor(debonairInstance) {
        this._styles = Im.Map({});
        this.debonairInstance = debonairInstance;
        console.log(debonairInstance);

    }
    pushStyle(styles) {
        this._styles = this._styles.setIn([styles.ownerScope, styles.cssId], styles.styles);
    }
    removeStyle(cssId, ownerScope) {
        this._styles = this._styles.deleteIn([ownerScope, cssId]);
        
        if (this._styles.get(ownerScope).size === 0) {
            this._styles = this._styles.delete(ownerScope);
        }
    }
    createStylesheets() {
        let stylesheetArr = this._styles.map(ownerStyles => {
            let stylesheet = ownerStyles.reduce(this.stylesheetFromStyles.bind(this), "");

            return stylesheet;
        })
        return stylesheetArr;
    }
    stylesheetFromStyles(accum, styles, cssId) {
        return accum + this.stylesObjToString(styles, `.${cssId}`);
    }
    stylesObjToString(styles, heading) {
        let stylesString = `${heading} {`;
        let stateStylesString = ``;
        let mediaQueriesStylesString = ``;
        let keyFramesString = ``;

        for(let key in styles) {
            let stateFlag = false;
            let queryFlag = false;
            let keyFrameFlag = false;
            for(let i = 0, l = states.length; i<l; i++) {
                if(key === states[i]) {
                    stateFlag = true;
                    stateStylesString += this.stylesObjToString(styles[key], `${heading}:${states[i]}`);
                }
            }

            if(this.debonairInstance.mediaQueries) {
                let queries = this.debonairInstance.mediaQueries;
                for (let query in queries) {
                    if(key === query) {
                        queryFlag = true;
                        mediaQueriesStylesString += this.stylesObjToString(styles[key], `@media ${queries[query]} {${heading}`) + "}";
                    }
                }
            }

            if(key === "keyframes") {
                keyFrameFlag = true;
                keyFramesString += `@keyframes ${styles.keyframes.name} {`;
                
                for(let keyFrame in styles.keyframes) {
                    let keyFrameObj = styles.keyframes[keyFrame];

                    keyFramesString += `${keyFrame} {`;

                    if(keyFrame !== "name") {
                        for (let keyFrameProp in keyFrameObj) {
                            keyFramesString += `${keyFrameProp}:${keyFrameObj[keyFrameProp]}; `
                        }
                    }

                    keyFramesString += "}"
                }
            }
            if(!stateFlag && !queryFlag && !keyFrameFlag) {
                if(propHandlers[key]) {
                    stylesString += propHandlers[key](styles);
                } else {
                    stylesString += `${_.kebabCase(key)}:${styles[key]};`;    
                }
            }
        }
        return `${stylesString}} ${stateStylesString} ${mediaQueriesStylesString} ${keyFramesString}`;
    }
}

export default Stylesheet;