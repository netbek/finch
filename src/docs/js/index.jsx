import _ from 'lodash';
import React, {Component} from 'react';
import vegaEmbed from 'vega-embed';
import * as plots from './plots';

class App extends Component {
  componentDidMount() {
    _.keys(plots)
      .filter(d => !~d.indexOf('__') && d !== 'default')
      .forEach(d => {
        vegaEmbed(`#${_.kebabCase(d)}`, plots[d], {
          actions: {
            export: false,
            source: true,
            compiled: false,
            editor: false
          },
          renderer: 'canvas'
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <h2>Deviation</h2>
          TODO
        </section>

        <section>
          <h2>Correlation</h2>

          <h3>Scatterplot</h3>
          <figure>
            <div id="scatterplot" />
          </figure>

          <h3>XY heatmap</h3>
          <figure>
            <div id="xy-heatmap">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Ranking</h2>

          <h3>Ordered bar chart</h3>
          <figure>
            <div id="ordered-barplot" />
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
            <div id="stripplot" />
          </figure>

          <h3>Dot plot</h3>
          <figure>
            <div id="dotplot">TODO</div>
          </figure>

          <h3>Boxplot</h3>
          <figure>
            <div id="boxplot" />
          </figure>

          <h3>Violin plot</h3>
          <figure>
            <div id="violinplot">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Change over time</h2>

          <h3>Line chart</h3>
          <figure>
            <div id="lineplot" />
          </figure>

          <h3>Column bar chart</h3>
          <figure>
            <div id="column-barplot" />
          </figure>

          <h3>Calendar heatmap</h3>
          <figure>
            <div id="calendar-heatmap">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Magnitude</h2>

          <h3>Column bar chart</h3>
          <figure>
            <div id="column-magnitude">TODO</div>
          </figure>

          <h3>Bar chart</h3>
          <figure>
            <div id="bar-magnitude">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Part-to-whole</h2>

          <h3>Stacked column</h3>
          <figure>
            <div id="stacked-column">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Spatial</h2>
          TODO
        </section>

        <section>
          <h2>Flow</h2>
          TODO
        </section>

        <section>
          <h2>Compound plots</h2>

          <h3>Dot-dash plot</h3>
          <figure>
            <div id="dot-dash-plot" />
          </figure>
        </section>

        <section>
          <h2>Small multiples</h2>

          <h3>Faceted histogram</h3>
          <figure>
            <div id="faceted-histogram" />
          </figure>

          <h3>Scatterplot matrix</h3>
          <figure>
            <div id="scatterplot-matrix" />
          </figure>
        </section>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
