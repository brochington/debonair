import _ from "lodash";

let styleTypeHandlers = {
    isArray(entity) {
        return merge(entity);
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

let determineType = entity => {
    if(_.isArray(entity)) {return "isArray"}
    if(entity._isStyler) {return "isStyler"}
    else if (_.isFunction(entity)) {return "isFunction"}
    else if (_.isObject(entity)) {return "isObject"}
    else if(_.isString(entity)) {return "isString"}
    return null;
}

// adds a hidden property on each returned object.
// let addContext = (context, val) => {
//     Object.defineProperty(val, "_stylerContext", {value: context});

//     return val;
// }

let merge = (stylesArr) => {
    // console.log("merge 2");
    // console.log(stylesArr);
    let styles = _.chain(stylesArr)
            .map(entity => {
                return styleTypeHandlers[determineType(entity)].bind(null, entity)
            })
            .reduce((outputObj, argFunc) => {
                _.assign(outputObj, argFunc(outputObj));

                return outputObj;
            }, {})
            .value();

    return styles;
}

// try to remove instanceof here.
let stylerFuncPropsAndMethods = {
    _isStyler: true,
    merge(...args) {
        let newArgs = [_.assign({}, this), ...args];

        return new StylerObject(merge(newArgs), this);
    },
    map(mapFunc) {
       let data = this instanceof StylerObject ? this : this._getStyles(),
           result = _.mapValues(data, mapFunc);

        return new StylerObject(result, this);
    },
    reduce(reduceFunc) {
        let data = this instanceof StylerObject ? this : this._getStyles(),
            result = _.reduce(data, reduceFunc, {});

        return new StylerObject(result, this);
    },
    filter(filterFunc) {
        let data = this instanceof StylerObject ? this : this._getStyles();
        let result = _.reduce(data, (accum, val, key) => {
            if(filterFunc(val, key)) {
                accum[key] = val;
            }
            return accum;
        }, {});

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

class StylerObject {
    constructor(result, context) {
        for (let prop in result) {
            this[prop] = result[prop];
        }
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
    merge(...args) {
        return stylerFuncPropsAndMethods.merge.call(this, ...args);
    }
    reduce(reduceFunc) {
        return stylerFuncPropsAndMethods.reduce.call(this, reduceFunc);
    }
}

class StandardStyler {
    constructor(stylerInstance, ...initStyles) {
        Object.defineProperty(this, "_initStyles", { value: initStyles});
        Object.defineProperty(this, "_stylerInstance", { value: stylerInstance});
    }
    _getStyles(...args) {
        let stylesArr = this._initStyles.concat(args);

        return new StylerObject(merge(stylesArr), this);
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
