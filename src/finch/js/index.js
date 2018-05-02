import {isArray, isObject, isString} from 'vega';
import {finch as theme} from './themes';

class Spec {
  constructor(data) {
    this.spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json'
    };
    return this.config(theme).data(data);
  }

  // https://vega.github.io/vega-lite/docs/config.html
  config(opts) {
    this.spec.config = this.spec.config ? {...this.spec.config, ...opts} : opts;
    return this;
  }

  // https://vega.github.io/vega-lite/docs/spec.html#single
  title(value) {
    this.spec.title = value;
    return this;
  }

  // https://vega.github.io/vega-lite/docs/spec.html#single
  description(value) {
    this.spec.description = value;
    return this;
  }

  // https://vega.github.io/vega-lite/docs/spec.html#single
  width(value) {
    this.spec.width = value;
    return this;
  }

  // https://vega.github.io/vega-lite/docs/spec.html#single
  height(value) {
    this.spec.height = value;
    return this;
  }

  // https://vega.github.io/vega-lite/docs/spec.html#single
  data(value) {
    if (isString(value)) {
      this.spec.data = {url: value};
    } else if (isArray(value)) {
      this.spec.data = {values: value};
    } else if (isObject(value)) {
      this.spec.data = value;
    }
    return this;
  }

  // https://vega.github.io/vega-lite/docs/transform.html
  transform(opts) {
    this.spec.transform = opts;
    return this;
  }

  __channel(prop, field, type, opts) {
    let result = {};

    if (field) {
      result.field = field;
      result.type = type;
    } else if (type) {
      result.type = type;
    }

    if (isObject(opts)) {
      result = {...result, ...opts};
    }

    if (!this.spec.encoding) {
      this.spec.encoding = {};
    }

    this.spec.encoding[prop] = result;

    return this;
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#position
  x(field, type, opts) {
    return this.__channel('x', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#position
  y(field, type, opts) {
    return this.__channel('y', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#position
  x2(field, type, opts) {
    return this.__channel('x2', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#position
  y2(field, type, opts) {
    return this.__channel('y2', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#geo
  longitude(field, type, opts) {
    return this.__channel('longitude', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#geo
  latitude(field, type, opts) {
    return this.__channel('latitude', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#geo
  longitude2(field, type, opts) {
    return this.__channel('longitude', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#geo
  latitude2(field, type, opts) {
    return this.__channel('latitude', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#mark-prop
  color(field, type, opts) {
    return this.__channel('color', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#mark-prop
  opacity(field, type, opts) {
    return this.__channel('opacity', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#mark-prop
  shape(field, type, opts) {
    return this.__channel('shape', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#mark-prop
  size(field, type, opts) {
    return this.__channel('size', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#text
  label(field, type, opts) {
    return this.__channel('text', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#text
  tooltip(field, type, opts) {
    return this.__channel('tooltip', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#href
  href(field, type, opts) {
    return this.__channel('href', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#detail
  detail(field, type, opts) {
    return this.__channel('detail', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#key
  key(field, type, opts) {
    return this.__channel('key', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#order
  order(field, type, opts) {
    return this.__channel('order', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#facet
  row(field, type, opts) {
    return this.__channel('row', field, type, opts);
  }

  // https://vega.github.io/vega-lite/docs/encoding.html#facet
  column(field, type, opts) {
    return this.__channel('column', field, type, opts);
  }

  __mark(prop, opts) {
    this.spec.mark = isObject(opts) ? {type: prop, ...opts} : {type: prop};
    return this;
  }

  // https://vega.github.io/vega-lite/docs/area.html
  area(opts) {
    return this.__mark('area', opts);
  }

  // https://vega.github.io/vega-lite/docs/bar.html
  bar(opts) {
    return this.__mark('bar', opts);
  }

  // https://vega.github.io/vega-lite/docs/circle.html
  circle(opts) {
    return this.__mark('circle', opts);
  }

  // https://vega.github.io/vega-lite/docs/geoshape.html
  geoshape(opts) {
    return this.__mark('geoshape', opts);
  }

  // https://vega.github.io/vega-lite/docs/line.html
  line(opts) {
    return this.__mark('line', opts);
  }

  // https://vega.github.io/vega-lite/docs/point.html
  point(opts) {
    return this.__mark('point', opts);
  }

  // https://vega.github.io/vega-lite/docs/rect.html
  rect(opts) {
    return this.__mark('rect', opts);
  }

  // https://vega.github.io/vega-lite/docs/rule.html
  rule(opts) {
    return this.__mark('rule', opts);
  }

  // https://vega.github.io/vega-lite/docs/square.html
  square(opts) {
    return this.__mark('square', opts);
  }

  // https://vega.github.io/vega-lite/docs/text.html
  text(opts) {
    return this.__mark('text', opts);
  }

  // https://vega.github.io/vega-lite/docs/tick.html
  tick(opts) {
    return this.__mark('tick', opts);
  }

  // https://vega.github.io/vega-lite/docs/trail.html
  trail(opts) {
    return this.__mark('trail', opts);
  }

  __concat(prop, args) {
    this.spec[prop] = args.map(plot => {
      const {
        spec: {$schema, background, padding, autosize, config, ...spec}
      } = plot;
      return spec;
    });
    return this;
  }

  // https://vega.github.io/vega-lite/docs/layer.html
  layer(...args) {
    return this.__concat('layer', args);
  }

  // https://vega.github.io/vega-lite/docs/concat.html#horizontal-concatenation
  hconcat(...args) {
    return this.__concat('hconcat', args);
  }

  // https://vega.github.io/vega-lite/docs/concat.html#vertical-concatenation
  vconcat(...args) {
    return this.__concat('vconcat', args);
  }

  __facet(prop, opts, plot) {
    const {
      spec: {$schema, background, padding, autosize, config, ...spec}
    } = plot;
    this.spec[prop] = opts;
    this.spec.spec = spec;
    return this;
  }

  // https://vega.github.io/vega-lite/docs/repeat.html
  repeat(opts, plot) {
    return this.__facet('repeat', opts, plot);
  }

  // https://vega.github.io/vega-lite/docs/facet.html
  facet(opts, plot) {
    return this.__facet('facet', opts, plot);
  }
}

export default data => new Spec(data);
