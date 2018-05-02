import finch from '../../../finch/js';

export default finch('data/iris.csv').repeat(
  {
    row: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
    column: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
  },
  finch()
    .width(100)
    .height(100)
    .circle()
    .x({repeat: 'column'}, 'quantitative')
    .y({repeat: 'row'}, 'quantitative')
    .color('species', 'nominal')
).spec;