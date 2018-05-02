import finch from '../../../finch/js';

// export default finch('data/iris.csv').facet(
//   {
//     column: {
//       field: 'species',
//       type: 'nominal'
//     }
//   },
//   finch()
//     .width(150)
//     .height(150)
//     .bar({binSpacing: 0})
//     .x('sepalLength', 'quantitative', {
//       bin: true
//     })
//     .y(null, 'quantitative', {aggregate: 'count'})
// ).spec;

export default finch('data/iris.csv')
  .width(150)
  .height(150)
  .bar({binSpacing: 0})
  .x('sepalLength', 'quantitative', {
    bin: true
  })
  .y(null, 'quantitative', {aggregate: 'count'})
  .column('species', 'nominal').spec;
