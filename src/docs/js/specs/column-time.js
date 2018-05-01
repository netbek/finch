import toVega from 'to-vega/index';
import theme from '../../../finch/js/theme';

const {spec} = toVega('data/sunspot-month.csv')
  .transform([{filter: {timeUnit: 'year', field: 'date', equal: 2001}}])
  .config(theme)
  .width(400)
  .height(200)
  .title('Monthly sunspot data, 2001')
  .bar()
  .x('date', 'ordinal', {
    axis: {format: '%b'},
    scale: {padding: 0.25},
    timeUnit: 'month'
  })
  .y('value', 'quantitative');

spec.data.format = {
  parse: {date: 'date:"%Y-%m"'}
};

export default spec;
