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
	        return this._merge(entity);
	    },
	    isObject: function isObject(entity) {
	        return entity;
	    },
	    isFunction: function isFunction(entity, collector) {
	        return entity(collector);
	    },
	    isStyler: function isStyler(entity, collector) {
	        return entity();
	    }
	};

	/*
	methods to add: omit, forIn, has, findKey, assign, forOwn, reject
	maybe: transform
	create: filterByKey, filterByValue, rejectByKey, rejectByValue
	*/

	// need to do more work to make sure that filter and reject always return a style object.
	var stylerFuncNormalMethods = {
	    map: "mapValues",
	    has: "has"
	};

	var stylerFuncPropsAndMethods = {
	    _isStyler: true,
	    merge: function merge() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return this._getStyles.apply(this, args);
	    },
	    reduce: function reduce(reduceFunc) {
	        return _.reduce(this._getStyles(), reduceFunc, {});
	    },
	    filter: function filter(filterFunc) {
	        return _.reduce(this._getStyles(), function (accum, val, key) {
	            if (filterFunc(val, key)) {
	                accum[key] = val;
	            }
	            return accum;
	        }, {});
	    },
	    get: function get(keysArr) {
	        var currentStyles = this._getStyles(),
	            accum = {};

	        for (var i = 0, l = keysArr.length; i < l; i++) {
	            if (currentStyles[keysArr[i]]) {
	                accum[keysArr[i]] = currentStyles[keysArr[i]];
	            }
	        }
	        return accum;
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

	var StandardStyler = (function () {
	    function StandardStyler(stylerInstance) {
	        for (var _len = arguments.length, initStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            initStyles[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, StandardStyler);

	        this._initStyles = initStyles;
	        this._stylerInstance = stylerInstance;
	    }

	    _createClass(StandardStyler, {
	        _getStyles: {
	            value: function _getStyles() {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                var stylesArr = this._initStyles.concat(args);

	                return this._merge(stylesArr);
	            }
	        },
	        _merge: {
	            value: function _merge(stylesArr) {
	                var _this = this;

	                // TODO: optimize styles chain.
	                var styles = _.chain(stylesArr).map(function (entity) {
	                    return styleTypeHandlers[determineType(entity)].bind(_this, entity);
	                }).reduce(function (outputObj, argFunc) {
	                    _.assign(outputObj, argFunc(outputObj));
	                    return outputObj;
	                }, {}).value();

	                return styles;
	            }
	        }
	    });

	    return StandardStyler;
	})();

	// EnumStylers will be very quick, but will be completely immutable
	// Good for a one time evaluation of a long sequence which will not change.
	// Can still use styler methods like map, reduce, etc.

	var EnumStyler = (function () {
	    function EnumStyler(stylerInstance) {
	        for (var _len = arguments.length, initArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            initArgs[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, EnumStyler);

	        this._styleCache = this._merge.apply(this, initArgs);
	    }

	    _createClass(EnumStyler, {
	        _getStyles: {
	            value: function _getStyles() {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	            }
	        }
	    });

	    return EnumStyler;
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

	                _.forEach(stylerFuncNormalMethods, function (lodashMethod, methodName) {
	                    // let boundMethod = _[lodashMethod]()
	                    Object.defineProperty(stylerFunc, methodName, {
	                        value: (function () {
	                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                                args[_key2] = arguments[_key2];
	                            }

	                            return _[lodashMethod].apply(_, [styler._getStyles()].concat(args));
	                        }).bind(styler)
	                    });
	                });

	                _.forEach(stylerFuncPropsAndMethods, function (propVal, propName) {
	                    Object.defineProperty(stylerFunc, propName, {
	                        value: typeof propVal === "function" ? propVal.bind(styler) : propVal
	                    });
	                });

	                // console.dir(stylerFunc);

	                return stylerFunc;
	            }
	        },
	        createEnum: {
	            value: function createEnum(initStyles) {
	                var enumStyler = new EnumStyler(initStyles, this);

	                return enumStyler._getStyles.bind(styler);
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