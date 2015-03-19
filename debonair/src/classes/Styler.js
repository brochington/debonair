import _ from "lodash";

let styleTypeHandlers = {
    isArray(entity) {
        return this._merge(entity);
    },
    isObject(entity) {
        return entity;
    },
    isFunction(entity, collector) {
        return entity(collector);
    }, 
    isStyler(entity, collector) {
        return entity();
    }
}
 
/*
methods to add: omit, forIn, has, findKey, assign, forOwn, reject
maybe: transform
create: filterByKey, filterByValue, rejectByKey, rejectByValue
*/

// need to do more work to make sure that filter and reject always return a style object.
let stylerFuncNormalMethods = {
    map: "mapValues",
    has: "has"
}

let stylerFuncPropsAndMethods = {
    _isStyler: true,
    merge(...args) { return this._getStyles(...args);},
    reduce(reduceFunc) {
        return _.reduce(this._getStyles(), reduceFunc, {});
    },
    filter(filterFunc) {
        return _.reduce(this._getStyles(), (accum, val, key) => {
            if(filterFunc(val, key)) {
                accum[key] = val;
            }
            return accum;
        }, {});
    },
    get(keysArr) {
        let currentStyles = this._getStyles(),
            accum = {};

        for(let i = 0, l = keysArr.length; i<l; i++) {
            if(currentStyles[keysArr[i]]) {
                accum[keysArr[i]] = currentStyles[keysArr[i]];
            }
        }
        return accum;
    }
}

let determineType = entity => {
    if(_.isArray(entity)) {return "isArray"}
    if(entity._isStyler) {return "isStyler"}
    else if (_.isFunction(entity)) {return "isFunction"}
    else if (_.isObject(entity)) {return "isObject"}
    else if(_.isString(entity)) {return "isString"}
    return null;
} 

class StandardStyler {
    constructor(stylerInstance, ...initStyles) {
        this._initStyles = initStyles;
        this._stylerInstance = stylerInstance;
    }
    _getStyles(...args) {
        let stylesArr = this._initStyles.concat(args);

        return this._merge(stylesArr);
    }
    _merge(stylesArr) {
        // TODO: optimize styles chain.
        let styles = _.chain(stylesArr)
            .map(entity => styleTypeHandlers[determineType(entity)].bind(this, entity))
            .reduce((outputObj, argFunc) => {
                _.assign(outputObj, argFunc(outputObj));
                return outputObj;
            }, {})
            .value();

        return styles;
    }
}

// EnumStylers will be very quick, but will be completely immutable
// Good for a one time evaluation of a long sequence which will not change.
// Can still use styler methods like map, reduce, etc.
class EnumStyler {
    constructor(stylerInstance, ...initArgs) {
        this._styleCache = this._merge(...initArgs);
    }
    _getStyles(...args) {

    }
}

class Styler {
    constructor(initConfig) {
    }
    create(...initStyles) {
        let styler = new StandardStyler(this, ...initStyles),
            stylerFunc = styler._getStyles.bind(styler);

        _.forEach(stylerFuncNormalMethods, (lodashMethod, methodName) => {
            // let boundMethod = _[lodashMethod]()
            Object.defineProperty(stylerFunc, methodName, {
                value: (...args) => {
                    return _[lodashMethod](styler._getStyles(), ...args);
                }.bind(styler)
            });
        });

        _.forEach(stylerFuncPropsAndMethods, (propVal, propName) => {
            Object.defineProperty(stylerFunc, propName, {
                value: typeof propVal === "function" ? propVal.bind(styler) : propVal
            });
        });

        console.dir(stylerFunc);

        return stylerFunc;
    }
    createEnum(initStyles) {
        let enumStyler = new EnumStyler(initStyles, this);

        return enumStyler._getStyles.bind(styler);
    }
}

export default new Styler();
