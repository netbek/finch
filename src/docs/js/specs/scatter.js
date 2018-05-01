import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/iris.csv')
  .config(theme)
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .height(200)
  .circle()
  .x('petalLength', 'quantitative')
  .y('sepalLength', 'quantitative')
  .color('species', 'nominal').spec;
