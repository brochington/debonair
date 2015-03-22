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

// adds a hidden property on each returned object.
let addContext = (context, val) => {
    Object.defineProperty(val, "_stylerContext", {value: context});

    return val;
}

// try to remove instanceof here.
let stylerFuncPropsAndMethods = {
    _isStyler: true,
    merge(...args) { return this._getStyles(...args);},
    map(mapFunc) {
       let data = this instanceof StylerObject ? this : this._getStyles(),
           result = addContext(this, _.mapValues(data, mapFunc));

        return new StylerObject(result, this);
    },
    reduce(reduceFunc) {
        let data = this instanceof StylerObject ? this : this._getStyles(),
            result = addContext(this, _.reduce(data, reduceFunc, {}));

        return new StylerObject(result, this);
    },
    filter(filterFunc) {
        let data = this instanceof StylerObject ? this : this._getStyles();
        let result = addContext(this, _.reduce(data, (accum, val, key) => {
            if(filterFunc(val, key)) {
                accum[key] = val;
            }
            return accum;
        }, {}));

        return new StylerObject(result, this);

    },
    get(keysArr) {
        let currentStyles = this instanceof StylerObject ? this : this._getStyles(),
            accum = {};

        for(let i = 0, l = keysArr.length; i<l; i++) {
            if(currentStyles[keysArr[i]]) {
                accum[keysArr[i]] = currentStyles[keysArr[i]];
            }
        }
        return new StylerObject(accum, this);
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

class StylerObject {
    constructor(result, context) {
        for (let prop in result) {
            this[prop] = result[prop];
        }
        Object.defineProperty(this, "_isStylerObject", {
            value: true
        });

        Object.defineProperty(this, "_stylerContext", {
            value: context
        });
    }
    map(mapFunc) {
        return stylerFuncPropsAndMethods.map.call(this, mapFunc);
    }
    filter(filterFunc) {
        return stylerFuncPropsAndMethods.filter.call(this, filterFunc);
    }
    get(keysArr) {
        return stylerFuncPropsAndMethods.get.call(this, keysArr);
    }
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

        return new StylerObject(styles, this);
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

        _.forEach(stylerFuncPropsAndMethods, (propVal, propName) => {
            Object.defineProperty(stylerFunc, propName, {
                value: typeof propVal === "function" ? propVal.bind(styler) : propVal
            });
        });

        return stylerFunc;
    }
    createEnum(initStyles) {
        let enumStyler = new EnumStyler(initStyles, this);

        return enumStyler._getStyles.bind(styler);
    }
}

export default new Styler();
