import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

export default toVega('data/sunspot.month.csv')
  .config(theme)
  .width(400)
  .height(200)
  .title('Monthly Sunspot Data, from 1749 to "Present"')
  .line()
  .x('time', 'temporal', {
    axis: {title: 'Year'},
    scale: {type: 'time', nice: {interval: 'year', step: 10}},
    timeUnit: 'year'
  })
  .y('sunspot\\.month', 'quantitative', {
    axis: {title: 'Number of sunspots'}
  }).spec;
