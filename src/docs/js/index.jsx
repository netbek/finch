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
            <div id="scatter" />
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

          <h3>Strip plot</h3>
          <figure>
            <div id="strip" />
          </figure>

          <h3>Dot plot</h3>
          <figure>
            <div id="dot" />
          </figure>

          <h3>Box plot</h3>
          <figure>
            <div id="box" />
          </figure>

          <h3>Violin plot</h3>
          <figure>
            <div id="violin" />
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
            <div id="column-time" />
          </figure>

          <h3>Calendar heatmap</h3>
          <figure>
            <div id="calendar-heatmap" />
          </figure>
        </section>

        <section>
          <h2>Magnitude</h2>

          <h3>Column</h3>
          <figure>
            <div id="column-magnitude" />
          </figure>

          <h3>Bar</h3>
          <figure>
            <div id="bar-magnitude" />
          </figure>
        </section>

        <section>
          <h2>Part-to-whole</h2>

          <h3>Stacked column</h3>
          <figure>
            <div id="stacked-column" />
          </figure>
        </section>

        <section>
          <h2>Spatial</h2>
        </section>

        <section>
          <h2>Flow</h2>
        </section>

        <section>
          <h2>Small multiples</h2>

          <h3>Histogram</h3>
          <figure>
            <div id="histogram-facet" />
          </figure>

          <h3>Repeated scatter plot</h3>
          <figure>
            <div id="scatter-repeat-column" />
          </figure>

          <h3>Scatter plot matrix</h3>
          <figure>
            <div id="scatter-matrix" />
          </figure>
        </section>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
