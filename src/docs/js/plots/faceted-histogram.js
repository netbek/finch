import finch from '@netbek/finch';

// Example of bin transform and ordinal scale
// https://vega.github.io/vega-lite/docs/bin.html#transform
// https://vega.github.io/vega-lite/docs/facet.html#row--column-encoding-channels
const {spec} = finch('data/iris.csv')
  .transform([
    {
      bin: true,
      field: 'sepalLength',
      as: 'binSepalLength'
    }
  ])
  .width(150)
  .height(150)
  .bar()
  .x('binSepalLength', 'o', {title: 'sepalLength'})
  .y(null, 'q', {aggregate: 'count', title: 'count'})
  .color(null, 'q', {mouseover: 'black'})
  .tooltip(null, 'q', {aggregate: 'count'})
  .column('species', 'n');

// Example of bin transform and `facet` method
// https://vega.github.io/vega-lite/docs/facet.html
// const {spec} = finch('data/iris.csv')
//   .transform([
//     {
//       bin: true,
//       field: 'sepalLength',
//       as: 'binSepalLength'
//     }
//   ])
//   .facet(
//     {
//       column: {
//         field: 'species',
//         type: 'n'
//       }
//     },
//     finch()
//       .width(150)
//       .height(150)
//       .bar()
//       .x('binSepalLength', 'o', {title: 'sepalLength'})
//       .y(null, 'q', {aggregate: 'count', title: 'count'})
//       .color(null, 'q', {mouseover: 'black'})
//       .tooltip(null, 'q', {aggregate: 'count'})
//   );

export default spec;
