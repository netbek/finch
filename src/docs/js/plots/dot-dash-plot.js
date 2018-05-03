import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv')
  .config({
    axisX: {titlePadding: 10},
    axisY: {titlePadding: -15}
  })
  .hconcat(
    finch()
      .height(300)
      .tick()
      .y('sepalLength', 'q', {
        axis: {labels: false, domain: false, ticks: false}
      })
      .x('species', 'n', {
        axis: {title: null, labels: false, domain: false, ticks: false}
      })
      .color('species', 'n', {legend: null}),
    finch().vconcat(
      finch()
        .width(300)
        .height(300)
        .circle()
        .x('petalLength', 'q', {axis: {title: null}})
        .y('sepalLength', 'q', {axis: {title: null}})
        .color('species', 'n', {
          condition: {
            selection: 'hover',
            value: 'black'
          }
        })
        .selection({
          hover: {
            type: 'single',
            on: 'mouseover',
            empty: 'none'
          }
        })
        .tooltip([
          {field: 'sepalLength', type: 'q'},
          {field: 'petalLength', type: 'q'}
        ]),
      finch()
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
