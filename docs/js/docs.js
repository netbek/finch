/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/docs/js/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/to-vega/index.js":
/***/ (function(module, exports) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var typeLookup = { n: 'nominal', o: 'ordinal', q: 'quantitative', t: 'temporal' };
var expandType = function expandType(t) {
  t = '' + t;
  if (t.length !== 1) return t;
  t = typeLookup[t];
  if (!t) throw new Error('invalid 1-character channel type');
  return t;
};
var isEmpty = function isEmpty(ar) {
  return ar.length === 0;
};
var last = function last(ar) {
  return ar[ar.length - 1];
};

var tv_new = function tv_new(data) {
  this.spec = { $schema: 'https://vega.github.io/schema/vega-lite/v2.json' };
  this._obj = this.spec;
  this._stack = [];
  if (data) this.data(data);
};
var proto = tv_new.prototype;
var tv = function tv(data) {
  return new tv_new(data);
};
var props = {
  basic: ['description', 'title', 'width', 'height', 'name', 'transform', '$schema', 'background', 'padding', 'autosize', 'config', 'selection', 'facet', 'repeat'],
  compose: ['layer', 'hconcat', 'vconcat'],
  mark: ['area', 'bar', 'circle', 'line', 'point', 'rect', 'rule', 'square', 'text', 'tick', 'geoshape'],
  channel: ['x', 'y', 'x2', 'y2', 'color', 'opacity', 'size', 'shape', 'label', 'tooltip', 'href', 'order', 'detail', 'row', 'column']
};

props.basic.forEach(function (a) {
  return proto[a] = function (x) {
    this._obj[a] = x;
    return this;
  };
});
proto.data = function (d) {
  this._obj.data = typeof d === 'string' ? { url: d } : { values: d };
  return this;
};
['across', 'down'].forEach(function (direc) {
  return proto[direc] = function () {
    this._obj.repeat = this._obj.repeat || {};

    for (var _len = arguments.length, flds = Array(_len), _key = 0; _key < _len; _key++) {
      flds[_key] = arguments[_key];
    }

    this._obj.repeat[direc === 'across' ? 'column' : 'row'] = flds;
    return this;
  };
});
proto.desc = function (d) {
  return this.description(d);
};
proto.projection = function (ops) {
  this._obj.projection = typeof ops === 'string' ? { type: ops } : ops;
  return this;
};
proto.proj = function (ops) {
  return this.projection(ops);
};
proto.prop = function (p, x) {
  this._obj[p] = x;
  return this;
};

props.compose.forEach(function (a) {
  return proto[a] = function () {
    this._obj[a] = [];
    this._stack.push(this._obj[a]);
    this._obj = {};
    last(this._stack).push(this._obj);
    return this;
  };
});

proto.open = function () {
  this._obj.spec = {};
  this._obj = this._obj.spec;
  this._stack.push(this._obj);
  return this;
};

proto.add = function () {
  if (!Array.isArray(last(this._stack))) throw new Error('not inside a composition array');
  this._obj = {};
  last(this._stack).push(this._obj);
  return this;
};

props.mark.forEach(function (a) {
  return proto[a] = function (ops) {
    if (Array.isArray(last(this._stack)) && this._obj.mark) {
      this._obj = {};
      last(this._stack).push(this._obj);
    }
    this._obj.mark = (typeof ops === 'undefined' ? 'undefined' : _typeof(ops)) === 'object' ? _extends({ type: a }, ops) : a;
    return this;
  };
});
proto.mark = function (m, ops) {
  if (props.mark.indexOf(m) === -1) throw new Error('invalid mark');
  return this[m](ops);
};

proto.end = function () {
  if (isEmpty(this._stack)) throw new Error('already at top-level');
  this._stack.pop();
  if (isEmpty(this._stack)) this._obj = this.spec;else {
    this._obj = last(this._stack);
    if (Array.isArray(this._obj)) this._obj = this._obj[this._obj.length - 1];
  }
  return this;
};

props.channel.forEach(function (a) {
  return proto[a] = function (fld, typ, ops) {
    var channel = {};
    if (fld) {
      channel.field = fld;
      channel.type = expandType(typ || 'q');
    } else if (typ) channel.type = expandType(typ);
    if ((typeof ops === 'undefined' ? 'undefined' : _typeof(ops)) === 'object') channel = _extends({}, channel, ops);
    if (!this._obj.encoding) this._obj.encoding = {};
    this._obj.encoding[a === 'label' ? 'text' : a] = channel;
    return this;
  };
});
proto.channel = function (chn, fld, typ, ops) {
  if (props.channel.indexOf(chn) === -1) throw new Error('invalid channel');
  return this[chn](fld, typ, ops);
};

proto.json = function () {
  return JSON.stringify(this.spec);
};

proto.plot = function () {
  return this.plotFunc.apply(this, arguments);
};
tv.setPlot = function (f) {
  proto.plotFunc = f;
  return this;
};

module.exports = tv;

/***/ }),

/***/ "./src/docs/js/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

var _lodash = __webpack_require__("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _vegaEmbed = __webpack_require__("vega-embed");

var _vegaEmbed2 = _interopRequireDefault(_vegaEmbed);

var _specs = __webpack_require__("./src/docs/js/specs/index.js");

var specs = _interopRequireWildcard(_specs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  App.prototype.componentDidMount = function componentDidMount() {
    _lodash2.default.keys(specs).filter(function (d) {
      return !~d.indexOf('__');
    }).forEach(function (d) {
      (0, _vegaEmbed2.default)('#' + _lodash2.default.kebabCase(d), specs[d], {
        actions: {
          export: false,
          source: true,
          compiled: false,
          editor: false
        }
      });
    });
  };

  App.prototype.render = function render() {
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Deviation'
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Correlation'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Scatter plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'scatter' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'XY heatmap'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'xy-heatmap' })
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Ranking'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Ordered bar'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'ordered-bar' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Ordered column'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'ordered-column' })
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Distribution'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Histogram'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'histogram' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Strip plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'strip' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Dot plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'dot' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Box plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'box' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Violin plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'violin' })
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Change over time'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Line chart'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'line' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Column'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'column-time' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Calendar heatmap'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'calendar-heatmap' })
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Magnitude'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Column'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'column-magnitude' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Bar'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'bar-magnitude' })
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Part-to-whole'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Stacked column'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'stacked-column' })
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Spatial'
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Flow'
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Small multiples'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Histogram'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'histogram-facet' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Repeated scatter plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'scatter-repeat-column' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Scatter plot matrix'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'scatter-matrix' })
        )
      )
    );
  };

  return App;
}(_react.Component);

ReactDOM.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }),

/***/ "./src/docs/js/specs/histogram-facet.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/iris.csv').config(_theme2.default).facet({
  column: {
    field: 'species',
    type: 'nominal'
  }
}).open().width(100).height(100).bar().x('sepalLength', 'quantitative', {
  title: 'sepalLength',
  bin: true
}).y(null, 'quantitative', { aggregate: 'count' }).spec;

/***/ }),

/***/ "./src/docs/js/specs/histogram.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/iris.csv').config(_theme2.default).title('Edgar Anderson\'s Iris Data').width(200).height(200).bar().x('sepalLength', 'quantitative', {
  bin: true
}).y(null, 'quantitative', { aggregate: 'count' }).spec;

/***/ }),

/***/ "./src/docs/js/specs/index.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _histogram = __webpack_require__("./src/docs/js/specs/histogram.js");

Object.defineProperty(exports, 'histogram', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_histogram).default;
  }
});

var _histogramFacet = __webpack_require__("./src/docs/js/specs/histogram-facet.js");

Object.defineProperty(exports, 'histogramFacet', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_histogramFacet).default;
  }
});

var _line = __webpack_require__("./src/docs/js/specs/line.js");

Object.defineProperty(exports, 'line', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_line).default;
  }
});

var _scatter = __webpack_require__("./src/docs/js/specs/scatter.js");

Object.defineProperty(exports, 'scatter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scatter).default;
  }
});

var _scatterMatrix = __webpack_require__("./src/docs/js/specs/scatter-matrix.js");

Object.defineProperty(exports, 'scatterMatrix', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scatterMatrix).default;
  }
});

var _scatterRepeatColumn = __webpack_require__("./src/docs/js/specs/scatter-repeat-column.js");

Object.defineProperty(exports, 'scatterRepeatColumn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scatterRepeatColumn).default;
  }
});

var _strip = __webpack_require__("./src/docs/js/specs/strip.js");

Object.defineProperty(exports, 'strip', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_strip).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/docs/js/specs/line.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/sunspot-month.csv').config(_theme2.default).width(400).height(200).title('Monthly Sunspot Data, from 1749 to "Present"').line().x('time', 'temporal', {
  axis: { title: 'Year' },
  scale: { type: 'time', nice: { interval: 'year', step: 10 } },
  timeUnit: 'year'
}).y('sunspotMonth', 'quantitative', {
  axis: { title: 'Number of sunspots' }
}).spec;

/***/ }),

/***/ "./src/docs/js/specs/scatter-matrix.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/iris.csv').config(_theme2.default).repeat({
  row: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
  column: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
}).open().width(100).height(100).circle().x({ repeat: 'column' }, 'quantitative').y({ repeat: 'row' }, 'quantitative').color('species', 'nominal').spec;

/***/ }),

/***/ "./src/docs/js/specs/scatter-repeat-column.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/iris.csv').config(_theme2.default).repeat({
  column: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
}).open().width(100).height(100).circle().x({ repeat: 'column' }, 'quantitative').y('sepalLength', 'quantitative').color('species', 'nominal').spec;

/***/ }),

/***/ "./src/docs/js/specs/scatter.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/iris.csv').config(_theme2.default).title('Edgar Anderson\'s Iris Data').width(200).height(200).circle().x('petalLength', 'quantitative', {
  axis: { title: 'Petal length' }
}).y('sepalLength', 'quantitative', {
  axis: { title: 'Sepal length' }
}).color('species', 'nominal', { title: 'Species' }).spec;

/***/ }),

/***/ "./src/docs/js/specs/strip.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _index = __webpack_require__("./node_modules/to-vega/index.js");

var _index2 = _interopRequireDefault(_index);

var _theme = __webpack_require__("./src/finch/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _index2.default)('data/iris.csv').config(_theme2.default).title('Edgar Anderson\'s Iris Data').width(200).tick().x('sepalLength', 'quantitative').y('species', 'nominal').color('species', 'nominal', { legend: null }).spec;

/***/ }),

/***/ "./src/finch/js/theme.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _vega = __webpack_require__("vega");

var defaultColor = (0, _vega.scheme)('category10')[0];
var darkGrey = '#252525';
var lightGrey = '#ccc';

var sansSerif = 'Helvetica, Arial, sans-serif';
var serif = 'et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif';
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

/***/ }),

/***/ "lodash":
/***/ (function(module, exports) {

module.exports = _;

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "vega":
/***/ (function(module, exports) {

module.exports = vega;

/***/ }),

/***/ "vega-embed":
/***/ (function(module, exports) {

module.exports = vegaEmbed;

/***/ })

/******/ });