# Finch

A Vega-Lite specification generator for JavaScript.

## Examples

[netbek.github.io/finch](https://netbek.github.io/finch)

## Installation

1. Install Finch using [`npm`](https://www.npmjs.com/):

    ```
    npm i @netbek/finch
    ```

2. If you use a module bundler, e.g. Webpack, then import the module:

    ```javascript
    import {vl} from '@netbek/finch';
    ```

    If you don't use a module bundler, then add the script to your HTML document to export the `finch` global variable:

    ```html
    <!-- Dependencies -->
    <script src="/path/to/vega/build/vega.min.js"></script>
    <script src="/path/to/vega-lite/build/vega-lite.min.js"></script>
    <script src="/path/to/vega-embed/build/vega-embed.min.js"></script>
    <!-- Finch -->
    <script src="/path/to/@netbek/finch/umd/finch.min.js"></script>
    ```

## Usage

```html
<div id="vis"></div>
<script>
  var spec = finch.vl().spec;
  vegaEmbed('#vis', spec);
</script>
```

See [the examples](https://netbek.github.io/finch), in lieu of an API reference.

## Credit

* [To-Vega](https://github.com/gjmcn/to-vega) - Primary inspiration for API. Finch aims to make view composition easier, and provide macros for composite plots, e.g. pair plot (seaborn).
* [Altair](https://github.com/altair-viz/altair)
* [seaborn](https://github.com/mwaskom/seaborn)
* [Financial Times Visual Vocabulary](https://github.com/ft-interactive/chart-doctor/tree/master/visual-vocabulary) - Inspiration for organisation of examples.
* [Tufte CSS](https://github.com/edwardtufte/tufte-css)

## Resources

* [Vega-Lite: specifications](https://vega.github.io/vega-lite/docs/spec.html)
* [Vega-Lite: theme configuration](https://vega.github.io/vega-lite/docs/config.html)

## Development

* [#2280 JavaScript Syntax for Vega-Lite (similar to Altair)](https://github.com/vega/vega-lite/issues/2280)

## License

Copyright (c) 2018 Hein Bekker. Licensed under the GNU Affero General Public License, version 3.
