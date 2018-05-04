import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv')
  .width(150)
  .height(150)
  .bar({binSpacing: 0})
  .x('sepalLength', 'q', {
    bin: true
  })
  .y(null, 'q', {aggregate: 'count'})
  .color(null, 'q', {mouseover: 'black'})
  .tooltip(null, 'q', {aggregate: 'count'})
  .column('species', 'n');

// Long-form version using the `facet` method
// const {spec} = finch('data/iris.csv').facet(
//   {
//     column: {
//       field: 'species',
//       type: 'n'
//     }
//   },
//   finch()
//     .width(150)
//     .height(150)
//     .bar({binSpacing: 0})
//     .x('sepalLength', 'q', {
//       bin: true
//     })
//     .y(null, 'q', {aggregate: 'count'})
//     .color(null, 'q', {mouseover: 'black'})
//     .tooltip(null, 'q', {aggregate: 'count'})
// );

export default spec;
