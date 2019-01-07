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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = finch;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _path = __webpack_require__(3);

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _vegaEmbed = __webpack_require__(6);

var _vegaEmbed2 = _interopRequireDefault(_vegaEmbed);

var _themes = __webpack_require__(7);

var _plots = __webpack_require__(10);

var plots = _interopRequireWildcard(_plots);

var _example = __webpack_require__(21);

var _example2 = _interopRequireDefault(_example);

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
    _lodash2.default.keys(plots).filter(function (d) {
      return !~d.indexOf('__') && d !== 'default';
    }).forEach(function (d) {
      (0, _vegaEmbed2.default)('#' + _lodash2.default.kebabCase(d), plots[d], {
        config: _themes.finch,
        actions: {
          export: false,
          source: true,
          compiled: false,
          editor: false
        },
        renderer: 'canvas'
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
        ),
        'TODO'
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
          'Scatterplot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-scatterplot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/tooltip.html</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">"Edgar Anderson\'s Iris Data"</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mouseover<span class="token punctuation">:</span> <span class="token string">\'black\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">tooltip</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>field<span class="token punctuation">:</span> <span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">\'q\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>field<span class="token punctuation">:</span> <span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">\'q\'</span><span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'XY heatmap'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'div',
            { id: 'vl-xy-heatmap' },
            'TODO'
          )
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
          'Ordered bar chart'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-ordered-barplot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/sort.html</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">"Edgar Anderson\'s Iris Data"</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>aggregate<span class="token punctuation">:</span> <span class="token string">\'max\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    scale<span class="token punctuation">:</span> <span class="token punctuation">{</span>padding<span class="token punctuation">:</span> <span class="token number">0.25</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    sort<span class="token punctuation">:</span> <span class="token punctuation">{</span>op<span class="token punctuation">:</span> <span class="token string">\'max\'</span><span class="token punctuation">,</span> field<span class="token punctuation">:</span> <span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">\'descending\'</span><span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mouseover<span class="token punctuation">:</span> <span class="token string">\'black\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">tooltip</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>aggregate<span class="token punctuation">:</span> <span class="token string">\'max\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
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
          _react2.default.createElement('div', { id: 'vl-histogram' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// Example of binning in encoding field</span>\n<span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/bin.html#encoding</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">"Edgar Anderson\'s Iris Data"</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>binSpacing<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    bin<span class="token punctuation">:</span> <span class="token boolean">true</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>aggregate<span class="token punctuation">:</span> <span class="token string">\'count\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mouseover<span class="token punctuation">:</span> <span class="token string">\'black\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">tooltip</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>aggregate<span class="token punctuation">:</span> <span class="token string">\'count\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Barcode plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-barcode-plot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">"Edgar Anderson\'s Iris Data"</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>legend<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Dot plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'div',
            { id: 'vl-dotplot' },
            'TODO'
          )
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Boxplot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-boxplot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/compositemark.html#boxplot</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">"Edgar Anderson\'s Iris Data"</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">boxplot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token string">\'sepalLength\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>legend<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Violin plot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'div',
            { id: 'vl-violinplot' },
            'TODO'
          )
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
          _react2.default.createElement('div', { id: 'vl-lineplot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/data.html#format</span>\n<span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/timeunit.html</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  url<span class="token punctuation">:</span> <span class="token string">\'data/sunspot-month.csv\'</span><span class="token punctuation">,</span>\n  format<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    parse<span class="token punctuation">:</span> <span class="token punctuation">{</span>date<span class="token punctuation">:</span> <span class="token string">\'date:"%Y-%m"\'</span><span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">\'Monthly sunspot data, from 1749 to "Present"\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">line</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'date\'</span><span class="token punctuation">,</span> <span class="token string">\'t\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    scale<span class="token punctuation">:</span> <span class="token punctuation">{</span>type<span class="token punctuation">:</span> <span class="token string">\'time\'</span><span class="token punctuation">,</span> nice<span class="token punctuation">:</span> <span class="token punctuation">{</span>interval<span class="token punctuation">:</span> <span class="token string">\'year\'</span><span class="token punctuation">,</span> step<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    timeUnit<span class="token punctuation">:</span> <span class="token string">\'year\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment" spellcheck="true">// No tooltip for `line` mark. See the following issues:</span>\n<span class="token comment" spellcheck="true">// * Feature request: https://github.com/vega/vega-tooltip/issues/120</span>\n<span class="token comment" spellcheck="true">// * Workaround: https://github.com/vega/vega-lite/issues/1921#issuecomment-298678178</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Column bar chart'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-column-barplot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/data.html#format</span>\n<span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/timeunit.html</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  url<span class="token punctuation">:</span> <span class="token string">\'data/sunspot-month.csv\'</span><span class="token punctuation">,</span>\n  format<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    parse<span class="token punctuation">:</span> <span class="token punctuation">{</span>date<span class="token punctuation">:</span> <span class="token string">\'date:"%Y-%m"\'</span><span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span>filter<span class="token punctuation">:</span> <span class="token punctuation">{</span>timeUnit<span class="token punctuation">:</span> <span class="token string">\'year\'</span><span class="token punctuation">,</span> field<span class="token punctuation">:</span> <span class="token string">\'date\'</span><span class="token punctuation">,</span> equal<span class="token punctuation">:</span> <span class="token number">2001</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">\'Monthly sunspot data, 2001\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'date\'</span><span class="token punctuation">,</span> <span class="token string">\'o\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>format<span class="token punctuation">:</span> <span class="token string">\'%b\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    scale<span class="token punctuation">:</span> <span class="token punctuation">{</span>padding<span class="token punctuation">:</span> <span class="token number">0.25</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    timeUnit<span class="token punctuation">:</span> <span class="token string">\'month\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mouseover<span class="token punctuation">:</span> <span class="token string">\'black\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">tooltip</span><span class="token punctuation">(</span><span class="token string">\'value\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Calendar heatmap'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'div',
            { id: 'vl-calendar-heatmap' },
            'TODO'
          )
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
          'Column bar chart'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'div',
            { id: 'vl-column-magnitude' },
            'TODO'
          )
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Bar chart'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'div',
            { id: 'vl-bar-magnitude' },
            'TODO'
          )
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
          _react2.default.createElement(
            'div',
            { id: 'vl-stacked-column' },
            'TODO'
          )
        )
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Spatial'
        ),
        'TODO'
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Flow'
        ),
        'TODO'
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Compound plots'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Dot-dash scatterplot'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-dot-dash-plot' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/concat.html</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    axisX<span class="token punctuation">:</span> <span class="token punctuation">{</span>titlePadding<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    axisY<span class="token punctuation">:</span> <span class="token punctuation">{</span>titlePadding<span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">hconcat</span><span class="token punctuation">(</span>\n    <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>labels<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> domain<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> ticks<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> labels<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> domain<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> ticks<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>legend<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">vconcat</span><span class="token punctuation">(</span>\n      <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mouseover<span class="token punctuation">:</span> <span class="token string">\'black\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">tooltip</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n          <span class="token punctuation">{</span>field<span class="token punctuation">:</span> <span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">\'q\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">{</span>field<span class="token punctuation">:</span> <span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">\'q\'</span><span class="token punctuation">}</span>\n        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n          axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>labels<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> domain<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> ticks<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n          axis<span class="token punctuation">:</span> <span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> labels<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> domain<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> ticks<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>legend<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
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
          'Faceted histogram'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-faceted-histogram' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// Example of bin transform and ordinal scale</span>\n<span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/bin.html#transform</span>\n<span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/facet.html#row--column-encoding-channels</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      bin<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      field<span class="token punctuation">:</span> <span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span>\n      <span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">\'binSepalLength\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token string">\'binSepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'o\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token string">\'sepalLength\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>aggregate<span class="token punctuation">:</span> <span class="token string">\'count\'</span><span class="token punctuation">,</span> title<span class="token punctuation">:</span> <span class="token string">\'count\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mouseover<span class="token punctuation">:</span> <span class="token string">\'black\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">tooltip</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>aggregate<span class="token punctuation">:</span> <span class="token string">\'count\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">column</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment" spellcheck="true">// Example of bin transform and `facet` method</span>\n<span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/facet.html</span>\n<span class="token comment" spellcheck="true">// const {spec} = vl(\'data/iris.csv\')</span>\n<span class="token comment" spellcheck="true">//   .transform([</span>\n<span class="token comment" spellcheck="true">//     {</span>\n<span class="token comment" spellcheck="true">//       bin: true,</span>\n<span class="token comment" spellcheck="true">//       field: \'sepalLength\',</span>\n<span class="token comment" spellcheck="true">//       as: \'binSepalLength\'</span>\n<span class="token comment" spellcheck="true">//     }</span>\n<span class="token comment" spellcheck="true">//   ])</span>\n<span class="token comment" spellcheck="true">//   .facet(</span>\n<span class="token comment" spellcheck="true">//     {</span>\n<span class="token comment" spellcheck="true">//       column: {</span>\n<span class="token comment" spellcheck="true">//         field: \'species\',</span>\n<span class="token comment" spellcheck="true">//         type: \'n\'</span>\n<span class="token comment" spellcheck="true">//       }</span>\n<span class="token comment" spellcheck="true">//     },</span>\n<span class="token comment" spellcheck="true">//     vl()</span>\n<span class="token comment" spellcheck="true">//       .width(150)</span>\n<span class="token comment" spellcheck="true">//       .height(150)</span>\n<span class="token comment" spellcheck="true">//       .bar()</span>\n<span class="token comment" spellcheck="true">//       .x(\'binSepalLength\', \'o\', {title: \'sepalLength\'})</span>\n<span class="token comment" spellcheck="true">//       .y(null, \'q\', {aggregate: \'count\', title: \'count\'})</span>\n<span class="token comment" spellcheck="true">//       .color(null, \'q\', {mouseover: \'black\'})</span>\n<span class="token comment" spellcheck="true">//       .tooltip(null, \'q\', {aggregate: \'count\'})</span>\n<span class="token comment" spellcheck="true">//   );</span></code></pre>'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Scatterplot matrix'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement('div', { id: 'vl-scatterplot-matrix' })
        ),
        _react2.default.createElement(
          _example2.default,
          null,
          '<pre><code><span class="token comment" spellcheck="true">// https://vega.github.io/vega-lite/docs/repeat.html</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span>spec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">vl</span><span class="token punctuation">(</span><span class="token string">\'data/iris.csv\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>\n  <span class="token punctuation">{</span>\n    row<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'sepalWidth\'</span><span class="token punctuation">,</span> <span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'petalWidth\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    column<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'sepalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'sepalWidth\'</span><span class="token punctuation">,</span> <span class="token string">\'petalLength\'</span><span class="token punctuation">,</span> <span class="token string">\'petalWidth\'</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">vl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">{</span>repeat<span class="token punctuation">:</span> <span class="token string">\'column\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">y</span><span class="token punctuation">(</span><span class="token punctuation">{</span>repeat<span class="token punctuation">:</span> <span class="token string">\'row\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'q\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">\'species\'</span><span class="token punctuation">,</span> <span class="token string">\'n\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>'
        )
      )
    );
  };

  return App;
}(_react.Component);

ReactDOM.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {
function normalizeArray(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    return '.';
  }

  if (dir) {
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];

  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {


var process = module.exports = {};

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }

    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }

    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = vegaEmbed;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(8);

Object.defineProperty(exports, 'finch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_finch).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _vega = __webpack_require__(9);

var defaultColor = (0, _vega.scheme)('category10')[0];
var darkGrey = '#252525';
var lightGrey = '#ccc';

var sansSerif = 'Helvetica, Arial, sans-serif';
var serif = 'Georgia, Times, serif';
var monospace = 'Consolas, "Liberation Mono", Menlo, Courier, monospace';
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
    titleFont: monospace,
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
    titleFont: monospace,
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
      font: monospace,
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
    font: monospace,
    fontSize: 13,
    fontWeight: 'bold',
    offset: 12
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = vega;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _barcodePlot = __webpack_require__(11);

Object.defineProperty(exports, 'vlBarcodePlot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_barcodePlot).default;
  }
});

var _boxplot = __webpack_require__(12);

Object.defineProperty(exports, 'vlBoxplot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_boxplot).default;
  }
});

var _columnBarplot = __webpack_require__(13);

Object.defineProperty(exports, 'vlColumnBarplot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_columnBarplot).default;
  }
});

var _dotDashPlot = __webpack_require__(14);

Object.defineProperty(exports, 'vlDotDashPlot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dotDashPlot).default;
  }
});

var _facetedHistogram = __webpack_require__(15);

Object.defineProperty(exports, 'vlFacetedHistogram', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_facetedHistogram).default;
  }
});

var _histogram = __webpack_require__(16);

Object.defineProperty(exports, 'vlHistogram', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_histogram).default;
  }
});

var _lineplot = __webpack_require__(17);

Object.defineProperty(exports, 'vlLineplot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_lineplot).default;
  }
});

var _orderedBarplot = __webpack_require__(18);

Object.defineProperty(exports, 'vlOrderedBarplot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_orderedBarplot).default;
  }
});

var _scatterplot = __webpack_require__(19);

Object.defineProperty(exports, 'vlScatterplot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scatterplot).default;
  }
});

var _scatterplotMatrix = __webpack_require__(20);

Object.defineProperty(exports, 'vlScatterplotMatrix', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scatterplotMatrix).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$title$width$tick$ = (0, _finch.vl)('data/iris.csv').title("Edgar Anderson's Iris Data").width(200).tick().x('sepalLength', 'q').y('species', 'n').color('species', 'n', { legend: null }),
    spec = _vl$title$width$tick$.spec;

exports.default = spec;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$title$width$heigh = (0, _finch.vl)('data/iris.csv').title("Edgar Anderson's Iris Data").width(200).height(200).boxplot().x('sepalLength', 'q', { axis: { title: 'sepalLength' } }).y('species', 'n').color('species', 'n', { legend: null }),
    spec = _vl$title$width$heigh.spec;

exports.default = spec;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$transform$width$h = (0, _finch.vl)({
  url: 'data/sunspot-month.csv',
  format: {
    parse: { date: 'date:"%Y-%m"' }
  }
}).transform([{ filter: { timeUnit: 'year', field: 'date', equal: 2001 } }]).width(400).height(200).title('Monthly sunspot data, 2001').bar().x('date', 'o', {
  axis: { format: '%b' },
  scale: { padding: 0.25 },
  timeUnit: 'month'
}).y('value', 'q').color(null, 'q', { mouseover: 'black' }).tooltip('value', 'q'),
    spec = _vl$transform$width$h.spec;

exports.default = spec;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$config$hconcat = (0, _finch.vl)('data/iris.csv').config({
  axisX: { titlePadding: 10 },
  axisY: { titlePadding: -15 }
}).hconcat((0, _finch.vl)().height(300).tick().y('sepalLength', 'q', {
  axis: { labels: false, domain: false, ticks: false }
}).x('species', 'n', {
  axis: { title: null, labels: false, domain: false, ticks: false }
}).color('species', 'n', { legend: null }), (0, _finch.vl)().vconcat((0, _finch.vl)().width(300).height(300).circle().x('petalLength', 'q', { axis: { title: null } }).y('sepalLength', 'q', { axis: { title: null } }).color('species', 'n', { mouseover: 'black' }).tooltip([{ field: 'sepalLength', type: 'q' }, { field: 'petalLength', type: 'q' }]), (0, _finch.vl)().width(300).tick().x('petalLength', 'q', {
  axis: { labels: false, domain: false, ticks: false }
}).y('species', 'n', {
  axis: { title: null, labels: false, domain: false, ticks: false }
}).color('species', 'n', { legend: null }))),
    spec = _vl$config$hconcat.spec;

exports.default = spec;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$transform$width$h = (0, _finch.vl)('data/iris.csv').transform([{
  bin: true,
  field: 'sepalLength',
  as: 'binSepalLength'
}]).width(150).height(150).bar().x('binSepalLength', 'o', { title: 'sepalLength' }).y(null, 'q', { aggregate: 'count', title: 'count' }).color(null, 'q', { mouseover: 'black' }).tooltip(null, 'q', { aggregate: 'count' }).column('species', 'n'),
    spec = _vl$transform$width$h.spec;

exports.default = spec;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$title$width$heigh = (0, _finch.vl)('data/iris.csv').title("Edgar Anderson's Iris Data").width(200).height(200).bar({ binSpacing: 0 }).x('sepalLength', 'q', {
  bin: true
}).y(null, 'q', { aggregate: 'count' }).color(null, 'q', { mouseover: 'black' }).tooltip(null, 'q', { aggregate: 'count' }),
    spec = _vl$title$width$heigh.spec;

exports.default = spec;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$width$height$titl = (0, _finch.vl)({
  url: 'data/sunspot-month.csv',
  format: {
    parse: { date: 'date:"%Y-%m"' }
  }
}).width(400).height(200).title('Monthly sunspot data, from 1749 to "Present"').line().x('date', 't', {
  scale: { type: 'time', nice: { interval: 'year', step: 10 } },
  timeUnit: 'year'
}).y('value', 'q'),
    spec = _vl$width$height$titl.spec;

exports.default = spec;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$title$width$heigh = (0, _finch.vl)('data/iris.csv').title("Edgar Anderson's Iris Data").width(200).height(90).bar().x('sepalLength', 'q', { aggregate: 'max' }).y('species', 'n', {
  scale: { padding: 0.25 },
  sort: { op: 'max', field: 'sepalLength', order: 'descending' }
}).color(null, 'q', { mouseover: 'black' }).tooltip('sepalLength', 'q', { aggregate: 'max' }),
    spec = _vl$title$width$heigh.spec;

exports.default = spec;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$title$width$heigh = (0, _finch.vl)('data/iris.csv').title("Edgar Anderson's Iris Data").width(200).height(200).circle().x('petalLength', 'q').y('sepalLength', 'q').color('species', 'n', { mouseover: 'black' }).tooltip([{ field: 'sepalLength', type: 'q' }, { field: 'petalLength', type: 'q' }]),
    spec = _vl$title$width$heigh.spec;

exports.default = spec;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _finch = __webpack_require__(0);

var _vl$repeat = (0, _finch.vl)('data/iris.csv').repeat({
  row: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
  column: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
}, (0, _finch.vl)().width(100).height(100).circle().x({ repeat: 'column' }, 'q').y({ repeat: 'row' }, 'q').color('species', 'n')),
    spec = _vl$repeat.spec;

exports.default = spec;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Example = function (_PureComponent) {
  _inherits(Example, _PureComponent);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Example.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "example" },
      _react2.default.createElement("div", {
        className: "example__code",
        "data-lang": "js",
        dangerouslySetInnerHTML: { __html: this.props.children }
      })
    );
  };

  return Example;
}(_react.PureComponent);

exports.default = Example;

/***/ })
/******/ ]);