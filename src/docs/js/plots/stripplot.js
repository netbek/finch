import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .tick()
  .x('sepalLength', 'quantitative')
  .y('species', 'nominal')
  .color('species', 'nominal', {legend: null});

export default spec;
