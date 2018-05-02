import finch from '../../../finch/js';

const {spec} = finch('data/iris.csv')
  .title(`Edgar Anderson's Iris Data`)
  .width(200)
  .height(200)
  .bar({binSpacing: 0})
  .x('sepalLength', 'quantitative', {
    bin: true
  })
  .y(null, 'quantitative', {aggregate: 'count'});

export default spec;
