/**
 * https://github.com/vega/vega-parser/blob/master/src/config.js
 */
import {scheme} from 'vega';

// Color
const defaultColor = scheme('category10')[0];
const darkGrey = '#252525';
const lightGrey = '#ccc';

// Typography
const sansSerif = 'Helvetica, Arial, sans-serif';
const serif =
  'et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif';
const monospace = 'Consolas, "Liberation Mono", Menlo, Courier, monospace';
const letterSpacing = 'normal';
const fontSize = 12;

export default {
  axis: {
    domainColor: darkGrey,
    domainWidth: 1,
    gridColor: lightGrey,
    gridDash: [3, 3],
    labelColor: darkGrey,
    labelFont: monospace,
    labelFontSize: fontSize,
    labelFontWeight: 'normal',
    titleColor: darkGrey,
    titleFont: serif,
    titleFontSize: fontSize,
    titleFontWeight: 'bold'
  },
  bar: {
    fill: defaultColor
  },
  legend: {
    labelFont: monospace,
    labelFontSize: fontSize,
    labelFontWeight: 'normal',
    titleFont: serif,
    titleFontSize: fontSize,
    titleFontWeight: 'bold'
  },
  line: {
    stroke: defaultColor
  },
  range: {
    category: {
      scheme: 'category10'
    }
  },
  style: {
    'guide-title': {
      font: serif,
      fontSize: fontSize,
      fontWeight: 'bold'
    },
    'guide-label': {
      font: monospace,
      fontSize: fontSize,
      fontWeight: 'normal'
    }
  },
  title: {
    color: darkGrey,
    font: serif,
    fontSize: 16,
    fontWeight: 'bold',
    offset: 12
  }
};
