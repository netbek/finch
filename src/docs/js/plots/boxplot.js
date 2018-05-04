import finch from '@netbek/finch';

// https://vega.github.io/vega-lite/docs/compositemark.html#boxplot
const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .boxplot()
  .x('sepalLength', 'q', {axis: {title: 'sepalLength'}})
  .y('species', 'n')
  .color('species', 'n', {legend: null});

export default spec;
