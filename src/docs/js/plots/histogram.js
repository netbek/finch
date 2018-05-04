import finch from '@netbek/finch';

// Example of binning in encoding field
// https://vega.github.io/vega-lite/docs/bin.html#encoding
const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .bar({binSpacing: 0})
  .x('sepalLength', 'q', {
    bin: true
  })
  .y(null, 'q', {aggregate: 'count'})
  .color(null, 'q', {mouseover: 'black'})
  .tooltip(null, 'q', {aggregate: 'count'});

export default spec;
