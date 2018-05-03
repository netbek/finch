import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv').repeat(
  {
    row: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
    column: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
  },
  finch()
    .width(100)
    .height(100)
    .circle()
    .x({repeat: 'column'}, 'q')
    .y({repeat: 'row'}, 'q')
    .color('species', 'n')
);

export default spec;
