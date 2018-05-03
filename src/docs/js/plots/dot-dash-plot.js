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
      .y('sepalLength', 'quantitative', {
        axis: {labels: false, domain: false, ticks: false}
      })
      .x('species', 'nominal', {
        axis: {title: null, labels: false, domain: false, ticks: false}
      })
      .color('species', 'nominal', {legend: null}),
    finch().vconcat(
      finch()
        .width(300)
        .height(300)
        .circle()
        .x('petalLength', 'quantitative', {axis: {title: null}})
        .y('sepalLength', 'quantitative', {axis: {title: null}})
        .color('species', 'nominal'),
      finch()
        .width(300)
        .tick()
        .x('petalLength', 'quantitative', {
          axis: {labels: false, domain: false, ticks: false}
        })
        .y('species', 'nominal', {
          axis: {title: null, labels: false, domain: false, ticks: false}
        })
        .color('species', 'nominal', {legend: null})
    )
  );

export default spec;
