import finch from '../../../finch/js';

const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .boxplot()
  .x('sepalLength', 'quantitative', {axis: {title: 'sepalLength'}})
  .y('species', 'nominal')
  .color('species', 'nominal', {legend: null});

export default spec;
