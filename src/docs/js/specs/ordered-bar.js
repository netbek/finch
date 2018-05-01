import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/iris.csv')
  .config(theme)
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .height(90)
  .bar()
  .x('sepalLength', 'quantitative', {aggregate: 'max'})
  .y('species', 'nominal', {
    scale: {padding: 0.25},
    sort: {op: 'max', field: 'sepalLength', order: 'descending'}
  }).spec;
