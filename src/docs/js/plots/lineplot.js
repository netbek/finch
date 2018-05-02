import finch from '../../../js';

const {spec} = finch({
  url: 'data/sunspot-month.csv',
  format: {
    parse: {date: 'date:"%Y-%m"'}
  }
})
  .width(400)
  .height(200)
  .title('Monthly sunspot data, from 1749 to "Present"')
  .line()
  .x('date', 'temporal', {
    scale: {type: 'time', nice: {interval: 'year', step: 10}},
    timeUnit: 'year'
  })
  .y('value', 'quantitative');

export default spec;
