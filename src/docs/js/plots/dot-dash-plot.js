import {vl} from '@netbek/finch';

// https://vega.github.io/vega-lite/docs/concat.html
const {spec} = vl('data/iris.csv')
  .config({
    axisX: {titlePadding: 10},
    axisY: {titlePadding: -15}
  })
  .hconcat(
    vl()
      .height(300)
      .tick()
      .y('sepalLength', 'q', {
        axis: {labels: false, domain: false, ticks: false}
      })
      .x('species', 'n', {
        axis: {title: null, labels: false, domain: false, ticks: false}
      })
      .color('species', 'n', {legend: null}),
    vl().vconcat(
      vl()
        .width(300)
        .height(300)
        .circle()
        .x('petalLength', 'q', {axis: {title: null}})
        .y('sepalLength', 'q', {axis: {title: null}})
        .color('species', 'n', {mouseover: 'black'})
        .tooltip([
          {field: 'sepalLength', type: 'q'},
          {field: 'petalLength', type: 'q'}
        ]),
      vl()
        .width(300)
        .tick()
        .x('petalLength', 'q', {
          axis: {labels: false, domain: false, ticks: false}
        })
        .y('species', 'n', {
          axis: {title: null, labels: false, domain: false, ticks: false}
        })
        .color('species', 'n', {legend: null})
    )
  );

export default spec;
