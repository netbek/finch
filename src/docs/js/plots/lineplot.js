import finch from '@netbek/finch';

// https://vega.github.io/vega-lite/docs/data.html#format
// https://vega.github.io/vega-lite/docs/timeunit.html
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
  .x('date', 't', {
    scale: {type: 'time', nice: {interval: 'year', step: 10}},
    timeUnit: 'year'
  })
  .y('value', 'q');

// No tooltip for `line` mark. See the following issues:
// * Feature request: https://github.com/vega/vega-tooltip/issues/120
// * Workaround: https://github.com/vega/vega-lite/issues/1921#issuecomment-298678178

export default spec;
