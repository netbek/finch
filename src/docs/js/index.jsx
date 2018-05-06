import {readFileSync} from 'fs';
import {join} from 'path';
import _ from 'lodash';
import React, {Component} from 'react';
import vegaEmbed from 'vega-embed';
import {finch as theme} from '../../js/themes';
import * as plots from './plots';
import Example from './example';

class App extends Component {
  componentDidMount() {
    _.keys(plots)
      .filter(d => !~d.indexOf('__') && d !== 'default')
      .forEach(d => {
        vegaEmbed(`#${_.kebabCase(d)}`, plots[d], {
          config: theme,
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
            <div id="vl-scatterplot" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/scatterplot.js.html'),
              'utf8'
            )}
          </Example>

          <h3>XY heatmap</h3>
          <figure>
            <div id="vl-xy-heatmap">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Ranking</h2>

          <h3>Ordered bar chart</h3>
          <figure>
            <div id="vl-ordered-barplot" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/ordered-barplot.js.html'),
              'utf8'
            )}
          </Example>
        </section>

        <section>
          <h2>Distribution</h2>

          <h3>Histogram</h3>
          <figure>
            <div id="vl-histogram" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/histogram.js.html'),
              'utf8'
            )}
          </Example>

          <h3>Barcode plot</h3>
          <figure>
            <div id="vl-barcode-plot" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/barcode-plot.js.html'),
              'utf8'
            )}
          </Example>

          <h3>Dot plot</h3>
          <figure>
            <div id="vl-dotplot">TODO</div>
          </figure>

          <h3>Boxplot</h3>
          <figure>
            <div id="vl-boxplot" />
          </figure>
          <Example>
            {readFileSync(join(__dirname, 'plots/vl/boxplot.js.html'), 'utf8')}
          </Example>

          <h3>Violin plot</h3>
          <figure>
            <div id="vl-violinplot">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Change over time</h2>

          <h3>Line chart</h3>
          <figure>
            <div id="vl-lineplot" />
          </figure>
          <Example>
            {readFileSync(join(__dirname, 'plots/vl/lineplot.js.html'), 'utf8')}
          </Example>

          <h3>Column bar chart</h3>
          <figure>
            <div id="vl-column-barplot" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/column-barplot.js.html'),
              'utf8'
            )}
          </Example>

          <h3>Calendar heatmap</h3>
          <figure>
            <div id="vl-calendar-heatmap">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Magnitude</h2>

          <h3>Column bar chart</h3>
          <figure>
            <div id="vl-column-magnitude">TODO</div>
          </figure>

          <h3>Bar chart</h3>
          <figure>
            <div id="vl-bar-magnitude">TODO</div>
          </figure>
        </section>

        <section>
          <h2>Part-to-whole</h2>

          <h3>Stacked column</h3>
          <figure>
            <div id="vl-stacked-column">TODO</div>
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

          <h3>Dot-dash scatterplot</h3>
          <figure>
            <div id="vl-dot-dash-plot" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/dot-dash-plot.js.html'),
              'utf8'
            )}
          </Example>
        </section>

        <section>
          <h2>Small multiples</h2>

          <h3>Faceted histogram</h3>
          <figure>
            <div id="vl-faceted-histogram" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/faceted-histogram.js.html'),
              'utf8'
            )}
          </Example>

          <h3>Scatterplot matrix</h3>
          <figure>
            <div id="vl-scatterplot-matrix" />
          </figure>
          <Example>
            {readFileSync(
              join(__dirname, 'plots/vl/scatterplot-matrix.js.html'),
              'utf8'
            )}
          </Example>
        </section>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
