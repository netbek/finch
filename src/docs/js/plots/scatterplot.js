import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .circle()
  .x('petalLength', 'quantitative')
  .y('sepalLength', 'quantitative')
  .color('species', 'nominal');

export default spec;
