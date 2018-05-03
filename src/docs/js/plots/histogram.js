import finch from '@netbek/finch';

const {spec} = finch('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200)
  .height(200)
  .bar({binSpacing: 0})
  .x('sepalLength', 'q', {
    bin: true
  })
  .y(null, 'q', {aggregate: 'count'})
  .color(null, 'q', {
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
  .tooltip(null, 'q', {aggregate: 'count'});

export default spec;
