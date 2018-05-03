(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vega"));
	else if(typeof define === 'function' && define.amd)
		define(["vega"], factory);
	else if(typeof exports === 'object')
		exports["finch"] = factory(require("vega"));
	else
		root["finch"] = factory(root["vega"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vega = __webpack_require__(0);

var _themes = __webpack_require__(2);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeMap = {
  q: 'quantitative',
  o: 'ordinal',
  n: 'nominal',
  t: 'temporal'
};

var get = function get(map, key, defaultValue) {
  if (!(0, _vega.isString)(key)) {
    return defaultValue;
  }
  if (key.length === 1) {
    return map[key];
  }
  return key;
};

var parseFieldDef = function parseFieldDef(field, type, opts) {
  var result = {};

  if (field) {
    result.field = field;
    result.type = get(typeMap, type);
  } else if (type) {
    result.type = get(typeMap, type);
  }

  if ((0, _vega.isObject)(opts)) {
    result = _extends({}, result, opts);
  }

  return result;
};

var Spec = function () {
  function Spec(data) {
    _classCallCheck(this, Spec);

    this.spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json'
    };
    return this.config(_themes.finch).data(data);
  }

  Spec.prototype.config = function config(opts) {
    this.spec.config = this.spec.config ? _extends({}, this.spec.config, opts) : opts;
    return this;
  };

  Spec.prototype.title = function title(value) {
    this.spec.title = value;
    return this;
  };

  Spec.prototype.description = function description(value) {
    this.spec.description = value;
    return this;
  };

  Spec.prototype.width = function width(value) {
    this.spec.width = value;
    return this;
  };

  Spec.prototype.height = function height(value) {
    this.spec.height = value;
    return this;
  };

  Spec.prototype.data = function data(value) {
    if ((0, _vega.isString)(value)) {
      this.spec.data = { url: value };
    } else if ((0, _vega.isArray)(value)) {
      this.spec.data = { values: value };
    } else if ((0, _vega.isObject)(value)) {
      this.spec.data = value;
    }
    return this;
  };

  Spec.prototype.transform = function transform(opts) {
    this.spec.transform = opts;
    return this;
  };

  Spec.prototype.__channel = function __channel(prop, field, type, opts) {
    var maybeArray = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var fieldDef = maybeArray && (0, _vega.isArray)(field) ? field.map(function (d) {
      return parseFieldDef(d.field, d.type, opts);
    }) : parseFieldDef(field, type, opts);

    if (!this.spec.encoding) {
      this.spec.encoding = {};
    }

    this.spec.encoding[prop] = fieldDef;

    return this;
  };

  Spec.prototype.x = function x(field, type, opts) {
    return this.__channel('x', field, type, opts);
  };

  Spec.prototype.y = function y(field, type, opts) {
    return this.__channel('y', field, type, opts);
  };

  Spec.prototype.x2 = function x2(field, type, opts) {
    return this.__channel('x2', field, type, opts);
  };

  Spec.prototype.y2 = function y2(field, type, opts) {
    return this.__channel('y2', field, type, opts);
  };

  Spec.prototype.longitude = function longitude(field, type, opts) {
    return this.__channel('longitude', field, type, opts);
  };

  Spec.prototype.latitude = function latitude(field, type, opts) {
    return this.__channel('latitude', field, type, opts);
  };

  Spec.prototype.longitude2 = function longitude2(field, type, opts) {
    return this.__channel('longitude', field, type, opts);
  };

  Spec.prototype.latitude2 = function latitude2(field, type, opts) {
    return this.__channel('latitude', field, type, opts);
  };

  Spec.prototype.color = function color(field, type, opts) {
    return this.__channel('color', field, type, opts);
  };

  Spec.prototype.opacity = function opacity(field, type, opts) {
    return this.__channel('opacity', field, type, opts);
  };

  Spec.prototype.shape = function shape(field, type, opts) {
    return this.__channel('shape', field, type, opts);
  };

  Spec.prototype.size = function size(field, type, opts) {
    return this.__channel('size', field, type, opts);
  };

  Spec.prototype.label = function label(field, type, opts) {
    return this.__channel('text', field, type, opts);
  };

  Spec.prototype.tooltip = function tooltip(field, type, opts) {
    return this.__channel('tooltip', field, type, opts, true);
  };

  Spec.prototype.href = function href(field, type, opts) {
    return this.__channel('href', field, type, opts);
  };

  Spec.prototype.detail = function detail(field, type, opts) {
    return this.__channel('detail', field, type, opts);
  };

  Spec.prototype.key = function key(field, type, opts) {
    return this.__channel('key', field, type, opts);
  };

  Spec.prototype.order = function order(field, type, opts) {
    return this.__channel('order', field, type, opts);
  };

  Spec.prototype.row = function row(field, type, opts) {
    return this.__channel('row', field, type, opts);
  };

  Spec.prototype.column = function column(field, type, opts) {
    return this.__channel('column', field, type, opts);
  };

  Spec.prototype.__mark = function __mark(prop, opts) {
    this.spec.mark = (0, _vega.isObject)(opts) ? _extends({ type: prop }, opts) : { type: prop };
    return this;
  };

  Spec.prototype.area = function area(opts) {
    return this.__mark('area', opts);
  };

  Spec.prototype.bar = function bar(opts) {
    return this.__mark('bar', opts);
  };

  Spec.prototype.boxplot = function boxplot(opts) {
    return this.__mark('box-plot', opts);
  };

  Spec.prototype.circle = function circle(opts) {
    return this.__mark('circle', opts);
  };

  Spec.prototype.geoshape = function geoshape(opts) {
    return this.__mark('geoshape', opts);
  };

  Spec.prototype.line = function line(opts) {
    return this.__mark('line', opts);
  };

  Spec.prototype.point = function point(opts) {
    return this.__mark('point', opts);
  };

  Spec.prototype.rect = function rect(opts) {
    return this.__mark('rect', opts);
  };

  Spec.prototype.rule = function rule(opts) {
    return this.__mark('rule', opts);
  };

  Spec.prototype.square = function square(opts) {
    return this.__mark('square', opts);
  };

  Spec.prototype.text = function text(opts) {
    return this.__mark('text', opts);
  };

  Spec.prototype.tick = function tick(opts) {
    return this.__mark('tick', opts);
  };

  Spec.prototype.trail = function trail(opts) {
    return this.__mark('trail', opts);
  };

  Spec.prototype.__concat = function __concat(prop, args) {
    this.spec[prop] = args.map(function (plot) {
      var _plot$spec = plot.spec,
          $schema = _plot$spec.$schema,
          background = _plot$spec.background,
          padding = _plot$spec.padding,
          autosize = _plot$spec.autosize,
          config = _plot$spec.config,
          spec = _objectWithoutProperties(_plot$spec, ['$schema', 'background', 'padding', 'autosize', 'config']);

      return spec;
    });
    return this;
  };

  Spec.prototype.layer = function layer() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.__concat('layer', args);
  };

  Spec.prototype.hconcat = function hconcat() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.__concat('hconcat', args);
  };

  Spec.prototype.vconcat = function vconcat() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.__concat('vconcat', args);
  };

  Spec.prototype.__facet = function __facet(prop, opts, plot) {
    var _plot$spec2 = plot.spec,
        $schema = _plot$spec2.$schema,
        background = _plot$spec2.background,
        padding = _plot$spec2.padding,
        autosize = _plot$spec2.autosize,
        config = _plot$spec2.config,
        spec = _objectWithoutProperties(_plot$spec2, ['$schema', 'background', 'padding', 'autosize', 'config']);

    this.spec[prop] = opts;
    this.spec.spec = spec;
    return this;
  };

  Spec.prototype.repeat = function repeat(opts, plot) {
    return this.__facet('repeat', opts, plot);
  };

  Spec.prototype.facet = function facet(opts, plot) {
    return this.__facet('facet', opts, plot);
  };

  return Spec;
}();

exports.default = function (data) {
  return new Spec(data);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(3);

Object.defineProperty(exports, 'finch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_finch).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _vega = __webpack_require__(0);

var defaultColor = (0, _vega.scheme)('category10')[0];
var darkGrey = '#252525';
var lightGrey = '#ccc';

var sansSerif = 'Helvetica, Arial, sans-serif';
var serif = 'Georgia, Times, serif';
var monospace = 'Consolas, "Liberation Mono", Menlo, Courier, monospace';
var letterSpacing = 'normal';
var fontSize = 12;

exports.default = {
  axis: {
    domainColor: darkGrey,
    domainWidth: 1,
    gridColor: lightGrey,
    gridDash: [3, 3],
    labelColor: darkGrey,
    labelFont: monospace,
    labelFontSize: fontSize,
    labelFontWeight: 'normal',
    titleColor: darkGrey,
    titleFont: serif,
    titleFontSize: fontSize,
    titleFontWeight: 'bold'
  },
  bar: {
    fill: defaultColor
  },
  legend: {
    labelFont: monospace,
    labelFontSize: fontSize,
    labelFontWeight: 'normal',
    titleFont: serif,
    titleFontSize: fontSize,
    titleFontWeight: 'bold'
  },
  line: {
    stroke: defaultColor
  },
  range: {
    category: {
      scheme: 'category10'
    }
  },
  style: {
    'guide-title': {
      font: serif,
      fontSize: fontSize,
      fontWeight: 'bold'
    },
    'guide-label': {
      font: monospace,
      fontSize: fontSize,
      fontWeight: 'normal'
    }
  },
  title: {
    color: darkGrey,
    font: serif,
    fontSize: 16,
    fontWeight: 'bold',
    offset: 12
  }
};

/***/ })
/******/ ])["default"];
});