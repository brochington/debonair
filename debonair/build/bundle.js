(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["debonair"] = factory(require("lodash"));
	else
		root["debonair"] = factory(root["lodash"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Debonair = _interopRequire(__webpack_require__(2));

	var Styler = _interopRequire(__webpack_require__(3));

	module.exports = {
	    Debonair: Debonair,
	    Styler: Styler
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _ = _interopRequire(__webpack_require__(4));

	var Debonair = function Debonair() {
	    _classCallCheck(this, Debonair);

	    this.something = "else";
	};

	module.exports = Debonair;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _ = _interopRequire(__webpack_require__(4));

	var styleTypeHandlers = {
	    isArray: function isArray(entity) {
	        return merge(entity);
	    },
	    isObject: function isObject(entity) {
	        return entity;
	    },
	    isFunction: function isFunction(entity, collector) {
	        return entity(collector);
	    },
	    isStyler: function isStyler(entity) {
	        return entity();
	    }
	};

	var determineType = function (entity) {
	    if (_.isArray(entity)) {
	        return "isArray";
	    }
	    if (entity._isStyler) {
	        return "isStyler";
	    } else if (_.isFunction(entity)) {
	        return "isFunction";
	    } else if (_.isObject(entity)) {
	        return "isObject";
	    } else if (_.isString(entity)) {
	        return "isString";
	    }
	    return null;
	};

	var merge = function (stylesArr) {
	    return _.chain(stylesArr).map(function (entity) {
	        return styleTypeHandlers[determineType(entity)].bind(null, entity);
	    }).reduce(function (outputObj, argFunc) {
	        _.assign(outputObj, argFunc(outputObj));

	        return outputObj;
	    }, {}).value();
	};

	var functionalMethods = {
	    merge: (function (_merge) {
	        var _mergeWrapper = function merge(_x) {
	            return _merge.apply(this, arguments);
	        };

	        _mergeWrapper.toString = function () {
	            return _merge.toString();
	        };

	        return _mergeWrapper;
	    })(function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var newArgs = [_.assign({}, this)].concat(args);

	        return new StylerObject(merge(newArgs), this);
	    }),
	    map: function map(mapFunc) {
	        var data = this instanceof StylerObject ? this : this._getStyles(),
	            result = _.mapValues(data, mapFunc);

	        return new StylerObject(result, this);
	    },
	    reduce: function reduce(reduceFunc) {
	        var data = this instanceof StylerObject ? this : this._getStyles(),
	            result = _.reduce(data, reduceFunc, {});

	        return new StylerObject(result, this);
	    },
	    filter: function filter(filterFunc) {
	        var data = this instanceof StylerObject ? this : this._getStyles();
	        var result = _.reduce(data, function (accum, val, key) {
	            if (filterFunc(val, key)) {
	                accum[key] = val;
	            }
	            return accum;
	        }, {});

	        return new StylerObject(result, this);
	    },
	    get: function get(keysArr) {
	        var currentStyles = this instanceof StylerObject ? this : this._getStyles(),
	            accum = {};

	        for (var i = 0, l = keysArr.length; i < l; i++) {
	            if (currentStyles[keysArr[i]]) {
	                accum[keysArr[i]] = currentStyles[keysArr[i]];
	            }
	        }

	        return new StylerObject(accum, this);
	    },
	    forIn: function forIn(iteratee) {
	        var data = this instanceof StylerObject ? this : this._getStyles();

	        _.forIn(data, iteratee);

	        return data;
	    },
	    update: function update() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var data = this instanceof StylerObject ? this : this._getStyles(),
	            mergedArgs = merge(args),
	            styles = {};

	        for (var prop in data) {
	            if (data[prop]) {
	                if (mergedArgs.hasOwnProperty(prop)) {
	                    if (!Object.is(mergedArgs[prop], null)) {
	                        styles[prop] = mergedArgs[prop];
	                    }
	                } else {
	                    styles[prop] = data[prop];
	                }
	            }
	        }

	        return new StylerObject(styles, this);
	    }
	};

	var StylerObject = (function () {
	    function StylerObject(result, context) {
	        _classCallCheck(this, StylerObject);

	        for (var prop in result) {
	            this[prop] = result[prop];
	        }
	    }

	    _createClass(StylerObject, {
	        map: {
	            value: function map(mapFunc) {
	                return functionalMethods.map.call(this, mapFunc);
	            }
	        },
	        filter: {
	            value: function filter(filterFunc) {
	                return functionalMethods.filter.call(this, filterFunc);
	            }
	        },
	        get: {
	            value: function get(keysArr) {
	                return functionalMethods.get.call(this, keysArr);
	            }
	        },
	        merge: {
	            value: function merge() {
	                var _functionalMethods$merge;

	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                return (_functionalMethods$merge = functionalMethods.merge).call.apply(_functionalMethods$merge, [this].concat(args));
	            }
	        },
	        reduce: {
	            value: function reduce(reduceFunc) {
	                return functionalMethods.reduce.call(this, reduceFunc);
	            }
	        },
	        forIn: {
	            value: function forIn(iteratee) {
	                return functionalMethods.forIn.call(this, iteratee);
	            }
	        },
	        update: {
	            value: function update() {
	                var _functionalMethods$update;

	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                return (_functionalMethods$update = functionalMethods.update).call.apply(_functionalMethods$update, [this].concat(args));
	            }
	        },
	        toStyler: {
	            value: function toStyler() {
	                return new Styler().create(this);
	            }
	        }
	    });

	    return StylerObject;
	})();

	var StandardStyler = (function () {
	    function StandardStyler(stylerInstance) {
	        for (var _len = arguments.length, initStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            initStyles[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, StandardStyler);

	        Object.defineProperty(this, "_initStyles", { value: initStyles });
	        Object.defineProperty(this, "_stylerInstance", { value: stylerInstance });
	    }

	    _createClass(StandardStyler, {
	        _getStyles: {
	            value: function _getStyles() {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                var stylesArr = this._initStyles.concat(args);

	                return new StylerObject(merge(stylesArr), this);
	            }
	        }
	    });

	    return StandardStyler;
	})();

	var Styler = (function () {
	    function Styler(initConfig) {
	        _classCallCheck(this, Styler);
	    }

	    _createClass(Styler, {
	        create: {
	            value: function create() {
	                for (var _len = arguments.length, initStyles = Array(_len), _key = 0; _key < _len; _key++) {
	                    initStyles[_key] = arguments[_key];
	                }

	                var styler = _applyConstructor(StandardStyler, [this].concat(initStyles)),
	                    stylerFunc = styler._getStyles.bind(styler);

	                _.forEach(functionalMethods, function (propVal, propName) {
	                    Object.defineProperty(stylerFunc, propName, {
	                        value: typeof propVal === "function" ? propVal.bind(styler) : propVal
	                    });
	                });

	                Object.defineProperty(stylerFunc, "_isStyler", { value: true });

	                return stylerFunc;
	            }
	        }
	    });

	    return Styler;
	})();

	module.exports = new Styler();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;