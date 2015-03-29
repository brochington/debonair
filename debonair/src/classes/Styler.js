import _ from "lodash";

let styleTypeHandlers = {
    isArray(entity) {
        return merge(entity);
    },
    isObject(entity) {
        return entity;
    },
    isFunction(entity, collector) {
        return entity(new StylerObject(collector));
    }, 
    isStyler(entity) {
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

let merge = (stylesArr) => {
    return _.chain(stylesArr)
            .map(entity => styleTypeHandlers[determineType(entity)].bind(null, entity))
            .reduce((outputObj, argFunc) => {
                _.assign(outputObj, argFunc(outputObj));

                return outputObj;
            }, {})
            .value();
}

let functionalMethods = {
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
    },
    forIn(iteratee) {
        let data = this instanceof StylerObject ? this : this._getStyles();

        _.forIn(data, iteratee);

        return data;
    },
    update(...args) {
        let data = this instanceof StylerObject ? this : this._getStyles(),
            mergedArgs = merge(args),
            styles = {};

        for(let prop in data) {
            if(data[prop]) {
                if(mergedArgs.hasOwnProperty(prop)) {
                    if(!Object.is(mergedArgs[prop], null)) {
                        styles[prop] = mergedArgs[prop];
                    }
                } else {
                    styles[prop] = data[prop];
                }
            }
        }

        return new StylerObject(styles, this);
    }
} 

class StylerObject {
    constructor(result) {
        for (let prop in result) {
            this[prop] = result[prop];
        }
    }
    map(mapFunc) {
        return functionalMethods.map.call(this, mapFunc);
    }
    filter(filterFunc) {
        return functionalMethods.filter.call(this, filterFunc);
    }
    get(keysArr) {
        return functionalMethods.get.call(this, keysArr);
    }
    merge(...args) {
        return functionalMethods.merge.call(this, ...args);
    }
    reduce(reduceFunc) {
        return functionalMethods.reduce.call(this, reduceFunc);
    }
    forIn(iteratee) {
        return functionalMethods.forIn.call(this, iteratee);
    }
    update(...args) {
        return functionalMethods.update.call(this, ...args);
    }
    toStyler() {
        return new Styler().create(this);
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

        _.forEach(functionalMethods, (propVal, propName) => {
            Object.defineProperty(stylerFunc, propName, {
                value: typeof propVal === "function" ? propVal.bind(styler) : propVal
            });
        });

        Object.defineProperty(stylerFunc, "_isStyler", {value: true});

        return stylerFunc;
    }
}

export default {
    Styler: new Styler(),
    StylerObject: StylerObject
}
