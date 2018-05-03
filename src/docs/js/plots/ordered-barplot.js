import finch from '@netbek/finch';

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
  .tooltip('sepalLength', 'q', {aggregate: 'max'});

export default spec;
