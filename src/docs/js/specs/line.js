import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

const {spec} = toVega('data/sunspot-month.csv')
  .config(theme)
  .width(400)
  .height(200)
  .title('Monthly sunspot data, from 1749 to "Present"')
  .line()
  .x('date', 'temporal', {
    scale: {type: 'time', nice: {interval: 'year', step: 10}},
    timeUnit: 'year'
  })
  .y('value', 'quantitative');

spec.data.format = {
  parse: {date: 'date:"%Y-%m"'}
};

export default spec;
