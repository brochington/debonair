import _ from "lodash";

const propHandlers = {
    flex(stylesObj) {
        let styles = stylesObj.flex;

        return `-webkit-box-flex:${styles};-moz-box-flex:${styles};-webkit-flex:${styles};flex:${styles};`;
    },
    display(stylesObj) {
        let styles = stylesObj.display;

        if(styles === "inline-flex") {
            return `display: -webkit-inline-box;display: -webkit-inline-flex;display: -ms-inline-flexbox;display: inline-flex;`;
        } else if(styles === "flex") {
            return `display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex`;
        } else {
            return `display:${styles};`;
        }
    },
    order(stylesObj) {
        let styles = stylesObj.order;
        return `-webkit-box-ordinal-group: ${styles};-moz-box-ordinal-group: ${styles};-ms-flex-order: ${styles};-webkit-order: ${styles};order: ${styles};`;
    },
    animation(stylesObj) {
        let animationStyleString = "";
        let styles = stylesObj.animation;
        styles.name = styles.name;

        for(let key in styles) {
            animationStyleString += `animation-${_.kebabCase(key)}:${styles[key]}; `;
        }

        return animationStyleString;
    },
    transition(stylesObj, heading) {
        let styles = stylesObj.transition;

        if(typeof styles === "string") {
            return `-webkit-transition:${styles};transition:${styles};`;    
        } else if (typeof styles === "object") {
            let transitionStylesString = "";
            for (let key in styles) {
                if(key !== "callback") {
                    transitionStylesString += `webkit-transition-${_.kebabCase(key)}:${styles[key]};transition-${_.kebabCase(key)}:${styles[key]};`;
                } else {
                    // console.log("got a callback!", heading);
                    if(document) {
                        let target = document.querySelector(heading);
                        // console.log(target);
                        target.addEventListener("transitionend", styles.callback);
                    }
                }
            }

            return transitionStylesString;
        }
        
    }
}

export default propHandlers;