import * as tslib_1 from "tslib";
import * as d3 from 'd3-selection';
import * as stringify_ from 'json-stringify-pretty-compact';
import { satisfies } from 'semver';
import * as vegaImport from 'vega-lib';
import * as vlImport from 'vega-lite';
import schemaParser from 'vega-schema-url-parser';
import * as themes from 'vega-themes';
import { Handler } from 'vega-tooltip';
import { post } from './post';
import { mergeDeep } from './util';
// https://github.com/rollup/rollup/issues/670
var stringify = stringify_.default || stringify_;
export var vega = vegaImport;
export var vl = vlImport;
var NAMES = {
    vega: 'Vega',
    'vega-lite': 'Vega-Lite',
};
var VERSION = {
    vega: vega.version,
    'vega-lite': vl ? vl.version : 'not available',
};
var PREPROCESSOR = {
    vega: function (vgjson, _) { return vgjson; },
    'vega-lite': function (vljson, config) { return vl.compile(vljson, { config: config }).spec; },
};
function isTooltipHandler(h) {
    return typeof h === 'function';
}
function viewSource(source, sourceHeader, sourceFooter, mode) {
    var header = "<html><head>" + sourceHeader + "</head><body><pre><code class=\"json\">";
    var footer = "</code></pre>" + sourceFooter + "</body></html>";
    var win = window.open('');
    win.document.write(header + source + footer);
    win.document.title = NAMES[mode] + " JSON Source";
}
/**
 * Embed a Vega visualization component in a web page. This function returns a promise.
 *
 * @param el        DOM element in which to place component (DOM node or CSS selector).
 * @param spec      String : A URL string from which to load the Vega specification.
 *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
 * @param opt       A JavaScript object containing options for embedding.
 */
export default function embed(el, spec, opt) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var actions, loader, renderer, logLevel, data, config, data, parsed, mode, vgSpec, div, runtime, view, handler, ctrl, ext_1, editorUrl_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    opt = opt || {};
                    actions = opt.actions === true || opt.actions === false
                        ? opt.actions
                        : tslib_1.__assign({ export: true, source: true, compiled: false, editor: true }, (opt.actions || {}));
                    loader = opt.loader || vega.loader();
                    renderer = opt.renderer || 'canvas';
                    logLevel = opt.logLevel || vega.Warn;
                    if (!vega.isString(spec)) return [3 /*break*/, 2];
                    return [4 /*yield*/, loader.load(spec)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, embed(el, JSON.parse(data), opt)];
                case 2:
                    config = opt.config || {};
                    if (!vega.isString(config)) return [3 /*break*/, 4];
                    return [4 /*yield*/, loader.load(config)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, embed(el, spec, tslib_1.__assign({}, opt, { config: JSON.parse(data) }))];
                case 4:
                    if (opt.theme) {
                        config = mergeDeep({}, themes[opt.theme], config);
                    }
                    if (spec.$schema) {
                        parsed = schemaParser(spec.$schema);
                        if (opt.mode && opt.mode !== parsed.library) {
                            console.warn("The given visualization spec is written in " + NAMES[parsed.library] + ", but mode argument sets " + NAMES[opt.mode] + ".");
                        }
                        mode = parsed.library;
                        if (!satisfies(VERSION[mode], "^" + parsed.version.slice(1))) {
                            console.warn("The input spec uses " + mode + " " + parsed.version + ", but the current version of " + NAMES[mode] + " is " + VERSION[mode] + ".");
                        }
                    }
                    else {
                        mode = opt.mode || 'vega';
                    }
                    vgSpec = PREPROCESSOR[mode](spec, config);
                    if (mode === 'vega-lite') {
                        if (vgSpec.$schema) {
                            parsed = schemaParser(vgSpec.$schema);
                            if (!satisfies(VERSION.vega, "^" + parsed.version.slice(1))) {
                                console.warn("The compiled spec uses Vega " + parsed.version + ", but current version is " + VERSION.vega + ".");
                            }
                        }
                    }
                    div = d3
                        .select(el) // d3.select supports elements and strings
                        .classed('vega-embed', true)
                        .html('');
                    if (opt.onBeforeParse) {
                        // Allow Vega spec to be modified before being used
                        vgSpec = opt.onBeforeParse(vgSpec);
                    }
                    runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config);
                    view = new vega.View(runtime, {
                        loader: loader,
                        logLevel: logLevel,
                        renderer: renderer,
                    }).initialize(el);
                    if (opt.tooltip !== false) {
                        handler = void 0;
                        if (isTooltipHandler(opt.tooltip)) {
                            handler = opt.tooltip;
                        }
                        else {
                            // user provided boolean true or tooltip options
                            handler = new Handler(opt.tooltip === true ? {} : opt.tooltip).call;
                        }
                        view.tooltip(handler);
                    }
                    // do not automatically enable hover for Vega-Lite.
                    if (opt.hover === undefined ? mode !== 'vega-lite' : opt.hover) {
                        view.hover();
                    }
                    if (opt) {
                        if (opt.width) {
                            view.width(opt.width);
                        }
                        if (opt.height) {
                            view.height(opt.height);
                        }
                        if (opt.padding) {
                            view.padding(opt.padding);
                        }
                    }
                    if (!opt.runAsync) return [3 /*break*/, 6];
                    return [4 /*yield*/, view.runAsync()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    view.run();
                    _a.label = 7;
                case 7:
                    if (actions !== false) {
                        ctrl = div.append('div').attr('class', 'vega-actions');
                        // add 'Export' action
                        if (actions === true || actions.export !== false) {
                            ext_1 = renderer === 'canvas' ? 'png' : 'svg';
                            ctrl
                                .append('a')
                                .text("Export as " + ext_1.toUpperCase())
                                .attr('href', '#')
                                .attr('target', '_blank')
                                .attr('download', "visualization." + ext_1)
                                .on('mousedown', function () {
                                var _this = this;
                                view
                                    .toImageURL(ext_1)
                                    .then(function (url) {
                                    _this.href = url;
                                })
                                    .catch(function (error) {
                                    throw error;
                                });
                                d3.event.preventDefault();
                            });
                        }
                        // add 'View Source' action
                        if (actions === true || actions.source !== false) {
                            ctrl
                                .append('a')
                                .text('View Source')
                                .attr('href', '#')
                                .on('click', function () {
                                viewSource(stringify(spec), opt.sourceHeader || '', opt.sourceFooter || '', mode);
                                d3.event.preventDefault();
                            });
                        }
                        // add 'View Compiled' action
                        if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
                            ctrl
                                .append('a')
                                .text('View Vega')
                                .attr('href', '#')
                                .on('click', function () {
                                viewSource(stringify(vgSpec), opt.sourceHeader || '', opt.sourceFooter || '', 'vega');
                                d3.event.preventDefault();
                            });
                        }
                        // add 'Open in Vega Editor' action
                        if (actions === true || actions.editor !== false) {
                            editorUrl_1 = opt.editorUrl || 'https://vega.github.io/editor/';
                            ctrl
                                .append('a')
                                .text('Open in Vega Editor')
                                .attr('href', '#')
                                .on('click', function () {
                                post(window, editorUrl_1, {
                                    config: config,
                                    mode: mode,
                                    renderer: renderer,
                                    spec: stringify(spec),
                                });
                                d3.event.preventDefault();
                            });
                        }
                    }
                    return [2 /*return*/, { view: view, spec: spec }];
            }
        });
    });
}
//# sourceMappingURL=embed.js.map