import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/iris.csv')
  .config(theme)
  .facet({
    column: {
      field: 'species',
      type: 'nominal'
    }
  })
  .open()
  .width(100)
  .height(100)
  .bar()
  .x('sepalLength', 'quantitative', {
    title: 'sepalLength',
    bin: true
  })
  .y(null, 'quantitative', {aggregate: 'count'}).spec;
