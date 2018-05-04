import finch from '@netbek/finch';

// https://vega.github.io/vega-lite/docs/data.html#format
// https://vega.github.io/vega-lite/docs/timeunit.html
const {spec} = finch({
  url: 'data/sunspot-month.csv',
  format: {
    parse: {date: 'date:"%Y-%m"'}
  }
})
  .transform([{filter: {timeUnit: 'year', field: 'date', equal: 2001}}])
  .width(400)
  .height(200)
  .title('Monthly sunspot data, 2001')
  .bar()
  .x('date', 'o', {
    axis: {format: '%b'},
    scale: {padding: 0.25},
    timeUnit: 'month'
  })
  .y('value', 'q')
  .color(null, 'q', {mouseover: 'black'})
  .tooltip('value', 'q');

export default spec;
