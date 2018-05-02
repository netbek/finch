import finch from '../../../js';

const {spec} = finch('data/iris.csv')
  .width(150)
  .height(150)
  .bar({binSpacing: 0})
  .x('sepalLength', 'quantitative', {
    bin: true
  })
  .y(null, 'quantitative', {aggregate: 'count'})
  .column('species', 'nominal');

// Long-form version using the `facet` method
// const {spec} = finch('data/iris.csv').facet(
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
// );

export default spec;
