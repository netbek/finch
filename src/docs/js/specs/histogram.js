import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/iris.csv')
  .config(theme)
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .height(200)
  .bar({binSpacing: 0})
  .x('sepalLength', 'quantitative', {
    bin: true
  })
  .y(null, 'quantitative', {aggregate: 'count'}).spec;
