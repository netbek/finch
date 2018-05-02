import finch from '../../../finch/js';

export default finch('data/iris.csv')
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .height(90)
  .bar()
  .x('sepalLength', 'quantitative', {aggregate: 'max'})
  .y('species', 'nominal', {
    scale: {padding: 0.25},
    sort: {op: 'max', field: 'sepalLength', order: 'descending'}
  }).spec;