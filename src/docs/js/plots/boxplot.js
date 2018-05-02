import finch from '../../../finch/js';

export default finch('data/iris.csv')
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .height(200)
  .boxplot({extent: 'min-max'})
  .x('sepalLength', 'quantitative', {axis: {title: 'sepalLength'}})
  .y('species', 'nominal')
  .color('species', 'nominal', {legend: null}).spec;
