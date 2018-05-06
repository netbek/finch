import {vl} from '@netbek/finch';

// https://vega.github.io/vega-lite/docs/tooltip.html
const {spec} = vl('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .circle()
  .x('petalLength', 'q')
  .y('sepalLength', 'q')
  .color('species', 'n', {mouseover: 'black'})
  .tooltip([
    {field: 'sepalLength', type: 'q'},
    {field: 'petalLength', type: 'q'}
  ]);

export default spec;
