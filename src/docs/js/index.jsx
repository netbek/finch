import _ from 'lodash';
import React, {Component} from 'react';
import vegaEmbed from 'vega-embed';
import * as specs from './specs';

class App extends Component {
  componentDidMount() {
    _.keys(specs)
      .filter(d => !~d.indexOf('__'))
      .forEach(d => {
        vegaEmbed(`#${_.kebabCase(d)}`, specs[d], {
          actions: {
            export: false,
            source: true,
            compiled: false,
            editor: false
          }
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <h2>Deviation</h2>
        </section>

        <section>
          <h2>Correlation</h2>

          <h3>Scatter plot</h3>
          <figure>
            <div id="scatter-plot" />
          </figure>

          <h3>XY heatmap</h3>
          <figure>
            <div id="xy-heatmap" />
          </figure>
        </section>

        <section>
          <h2>Ranking</h2>

          <h3>Ordered bar</h3>
          <figure>
            <div id="ordered-bar" />
          </figure>

          <h3>Ordered column</h3>
          <figure>
            <div id="ordered-column" />
          </figure>
        </section>

        <section>
          <h2>Distribution</h2>

          <h3>Histogram</h3>
          <figure>
            <div id="histogram" />
          </figure>

          <h3>Dot plot</h3>
          <figure>
            <div id="dot-plot" />
          </figure>

          <h3>Box plot</h3>
          <figure>
            <div id="box-plot" />
          </figure>

          <h3>Violin plot</h3>
          <figure>
            <div id="violin-plot" />
          </figure>
        </section>

        <section>
          <h2>Change over time</h2>

          <h3>Line chart</h3>
          <figure>
            <div id="line" />
          </figure>

          <h3>Column</h3>
          <figure>
            <div id="column" />
          </figure>

          <h3>Calendar heatmap</h3>
          <figure>
            <div id="calendar-heatmap" />
          </figure>
        </section>

        <section>
          <h2>Magnitude</h2>
        </section>

        <section>
          <h2>Part-to-whole</h2>
        </section>

        <section>
          <h2>Spatial</h2>
        </section>

        <section>
          <h2>Flow</h2>
        </section>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
