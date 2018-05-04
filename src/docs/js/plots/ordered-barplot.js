import finch from '@netbek/finch';

// https://vega.github.io/vega-lite/docs/sort.html
const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(90)
  .bar()
  .x('sepalLength', 'q', {aggregate: 'max'})
  .y('species', 'n', {
    scale: {padding: 0.25},
    sort: {op: 'max', field: 'sepalLength', order: 'descending'}
  })
  .color(null, 'q', {mouseover: 'black'})
  .tooltip('sepalLength', 'q', {aggregate: 'max'});

export default spec;
