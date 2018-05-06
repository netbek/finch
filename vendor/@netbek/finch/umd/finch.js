(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vega"));
	else if(typeof define === 'function' && define.amd)
		define(["vega"], factory);
	else if(typeof exports === 'object')
		exports["finch"] = factory(require("vega"));
	else
		root["finch"] = factory(root["vega"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _vl = __webpack_require__(1);

Object.defineProperty(exports, 'vl', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_vl).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vega = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var parseChannelDef = function parseChannelDef(field, type, opts) {
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

  var _result = result,
      mouseover = _result.mouseover,
      channelDef = _objectWithoutProperties(_result, ['mouseover']);

  return { channelDef: channelDef, mouseover: mouseover };
};

var parseMouseoverDef = function parseMouseoverDef(mouseover) {
  if (!mouseover) {
    return { condition: {}, selection: {} };
  }

  if ((0, _vega.isObject)(mouseover)) {
    var bind = mouseover.bind,
        encodings = mouseover.encodings,
        fields = mouseover.fields,
        nearest = mouseover.nearest,
        toggle = mouseover.toggle,
        translate = mouseover.translate,
        zoom = mouseover.zoom,
        condition = _objectWithoutProperties(mouseover, ['bind', 'encodings', 'fields', 'nearest', 'toggle', 'translate', 'zoom']);

    var selection = {
      bind: bind,
      encodings: encodings,
      fields: fields,
      nearest: nearest,
      toggle: toggle,
      translate: translate,
      zoom: zoom
    };

    return { condition: condition, selection: selection };
  }

  return {
    condition: {
      value: mouseover
    },
    selection: {}
  };
};

var Vl = function () {
  function Vl(data) {
    _classCallCheck(this, Vl);

    this.spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json'
    };
    return this.data(data);
  }

  Vl.prototype.config = function config(opts) {
    this.spec.config = this.spec.config ? _extends({}, this.spec.config, opts) : opts;
    return this;
  };

  Vl.prototype.title = function title(value) {
    this.spec.title = value;
    return this;
  };

  Vl.prototype.description = function description(value) {
    this.spec.description = value;
    return this;
  };

  Vl.prototype.width = function width(value) {
    this.spec.width = value;
    return this;
  };

  Vl.prototype.height = function height(value) {
    this.spec.height = value;
    return this;
  };

  Vl.prototype.data = function data(value) {
    if ((0, _vega.isString)(value)) {
      this.spec.data = { url: value };
    } else if ((0, _vega.isArray)(value)) {
      this.spec.data = { values: value };
    } else if ((0, _vega.isObject)(value)) {
      this.spec.data = value;
    }
    return this;
  };

  Vl.prototype.transform = function transform(opts) {
    this.spec.transform = opts;
    return this;
  };

  Vl.prototype.selection = function selection(opts) {
    this.spec.selection = opts;
    return this;
  };

  Vl.prototype.__channel = function __channel(prop, field, type, opts) {
    var maybeArray = prop === 'tooltip';

    if (!this.spec.encoding) {
      this.spec.encoding = {};
    }

    if (maybeArray && (0, _vega.isArray)(field)) {
      this.spec.encoding[prop] = field.map(function (d) {
        return parseChannelDef(d.field, d.type, opts).channelDef;
      });

      return this;
    }

    var _parseChannelDef = parseChannelDef(field, type, opts),
        channelDef = _parseChannelDef.channelDef,
        mouseover = _parseChannelDef.mouseover;

    if (mouseover) {
      var _parseMouseoverDef = parseMouseoverDef(mouseover),
          condition = _parseMouseoverDef.condition,
          selection = _parseMouseoverDef.selection;

      if (condition) {
        if (!this.spec.selection) {
          this.spec.selection = {};
        }

        this.spec.selection.mouseover = _extends({
          type: 'single',
          on: 'mouseover',
          empty: 'none'
        }, selection);

        channelDef.condition = _extends({}, condition, {
          selection: 'mouseover'
        });
      }
    }

    this.spec.encoding[prop] = channelDef;

    return this;
  };

  Vl.prototype.x = function x(field, type, opts) {
    return this.__channel('x', field, type, opts);
  };

  Vl.prototype.y = function y(field, type, opts) {
    return this.__channel('y', field, type, opts);
  };

  Vl.prototype.x2 = function x2(field, type, opts) {
    return this.__channel('x2', field, type, opts);
  };

  Vl.prototype.y2 = function y2(field, type, opts) {
    return this.__channel('y2', field, type, opts);
  };

  Vl.prototype.longitude = function longitude(field, type, opts) {
    return this.__channel('longitude', field, type, opts);
  };

  Vl.prototype.latitude = function latitude(field, type, opts) {
    return this.__channel('latitude', field, type, opts);
  };

  Vl.prototype.longitude2 = function longitude2(field, type, opts) {
    return this.__channel('longitude', field, type, opts);
  };

  Vl.prototype.latitude2 = function latitude2(field, type, opts) {
    return this.__channel('latitude', field, type, opts);
  };

  Vl.prototype.color = function color(field, type, opts) {
    return this.__channel('color', field, type, opts);
  };

  Vl.prototype.opacity = function opacity(field, type, opts) {
    return this.__channel('opacity', field, type, opts);
  };

  Vl.prototype.shape = function shape(field, type, opts) {
    return this.__channel('shape', field, type, opts);
  };

  Vl.prototype.size = function size(field, type, opts) {
    return this.__channel('size', field, type, opts);
  };

  Vl.prototype.label = function label(field, type, opts) {
    return this.__channel('text', field, type, opts);
  };

  Vl.prototype.tooltip = function tooltip(field, type, opts) {
    return this.__channel('tooltip', field, type, opts);
  };

  Vl.prototype.href = function href(field, type, opts) {
    return this.__channel('href', field, type, opts);
  };

  Vl.prototype.detail = function detail(field, type, opts) {
    return this.__channel('detail', field, type, opts);
  };

  Vl.prototype.key = function key(field, type, opts) {
    return this.__channel('key', field, type, opts);
  };

  Vl.prototype.order = function order(field, type, opts) {
    return this.__channel('order', field, type, opts);
  };

  Vl.prototype.row = function row(field, type, opts) {
    return this.__channel('row', field, type, opts);
  };

  Vl.prototype.column = function column(field, type, opts) {
    return this.__channel('column', field, type, opts);
  };

  Vl.prototype.__mark = function __mark(prop, opts) {
    this.spec.mark = (0, _vega.isObject)(opts) ? _extends({ type: prop }, opts) : { type: prop };
    return this;
  };

  Vl.prototype.area = function area(opts) {
    return this.__mark('area', opts);
  };

  Vl.prototype.bar = function bar(opts) {
    return this.__mark('bar', opts);
  };

  Vl.prototype.boxplot = function boxplot(opts) {
    return this.__mark('box-plot', opts);
  };

  Vl.prototype.circle = function circle(opts) {
    return this.__mark('circle', opts);
  };

  Vl.prototype.geoshape = function geoshape(opts) {
    return this.__mark('geoshape', opts);
  };

  Vl.prototype.line = function line(opts) {
    return this.__mark('line', opts);
  };

  Vl.prototype.point = function point(opts) {
    return this.__mark('point', opts);
  };

  Vl.prototype.rect = function rect(opts) {
    return this.__mark('rect', opts);
  };

  Vl.prototype.rule = function rule(opts) {
    return this.__mark('rule', opts);
  };

  Vl.prototype.square = function square(opts) {
    return this.__mark('square', opts);
  };

  Vl.prototype.text = function text(opts) {
    return this.__mark('text', opts);
  };

  Vl.prototype.tick = function tick(opts) {
    return this.__mark('tick', opts);
  };

  Vl.prototype.trail = function trail(opts) {
    return this.__mark('trail', opts);
  };

  Vl.prototype.__concat = function __concat(prop, args) {
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

  Vl.prototype.layer = function layer() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.__concat('layer', args);
  };

  Vl.prototype.hconcat = function hconcat() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.__concat('hconcat', args);
  };

  Vl.prototype.vconcat = function vconcat() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.__concat('vconcat', args);
  };

  Vl.prototype.__facet = function __facet(prop, opts, plot) {
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

  Vl.prototype.repeat = function repeat(opts, plot) {
    return this.__facet('repeat', opts, plot);
  };

  Vl.prototype.facet = function facet(opts, plot) {
    return this.__facet('facet', opts, plot);
  };

  return Vl;
}();

exports.default = function (data) {
  return new Vl(data);
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});