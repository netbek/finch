import {isArray, isObject, isString} from 'vega';

const typeMap = {
  q: 'quantitative',
  o: 'ordinal',
  n: 'nominal',
  t: 'temporal'
};

class Vg {
  constructor(data) {
    this.spec = {
      $schema: 'https://vega.github.io/schema/vega/v3.0.json'
    };
    return this.data(data);
  }

  // https://vega.github.io/vega/docs/config
  config(opts) {
    this.spec.config = this.spec.config ? {...this.spec.config, ...opts} : opts;
    return this;
  }

  // https://vega.github.io/vega/docs/specification
  title(value) {
    this.spec.title = value;
    return this;
  }

  // https://vega.github.io/vega/docs/specification
  description(value) {
    this.spec.description = value;
    return this;
  }

  // https://vega.github.io/vega/docs/specification
  width(value) {
    this.spec.width = value;
    return this;
  }

  // https://vega.github.io/vega/docs/specification
  height(value) {
    this.spec.height = value;
    return this;
  }

  // https://vega.github.io/vega/docs/specification
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
}

export default data => new Vg(data);
