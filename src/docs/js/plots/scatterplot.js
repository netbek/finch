import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .circle()
  .x('petalLength', 'q')
  .y('sepalLength', 'q')
  .color('species', 'n')
  .tooltip([
    {field: 'sepalLength', type: 'q'},
    {field: 'petalLength', type: 'q'}
  ]);

export default spec;
