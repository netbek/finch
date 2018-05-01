import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/iris.csv')
  .config(theme)
  .repeat({
    row: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
    column: ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth']
  })
  .open()
  .width(100)
  .height(100)
  .circle()
  .x({repeat: 'column'}, 'quantitative')
  .y({repeat: 'row'}, 'quantitative')
  .color('species', 'nominal').spec;
