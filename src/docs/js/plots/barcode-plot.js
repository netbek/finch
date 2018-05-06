import {vl} from '@netbek/finch';

const {spec} = vl('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .tick()
  .x('sepalLength', 'q')
  .y('species', 'n')
  .color('species', 'n', {legend: null});

export default spec;
