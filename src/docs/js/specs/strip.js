import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/iris.csv')
  .config(theme)
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .tick()
  .x('sepalLength', 'quantitative')
  .y('species', 'nominal')
  .color('species', 'nominal', {legend: null}).spec;
