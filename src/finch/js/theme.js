/**
 * See https://github.com/vega/vega-parser/blob/master/src/config.js
 */

// Color
const defaultColor = 'blue';
const darkGrey = '#252525';
const lightGrey = '#ccc';
const red = '#f00';

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
    titleFont: monospace,
    titleFontSize: fontSize,
    titleFontWeight: 'normal'
  },
  legend: {
    labelFont: monospace,
    labelFontSize: fontSize,
    labelFontWeight: 'normal',
    titleFont: monospace,
    titleFontSize: fontSize,
    titleFontWeight: 'normal'
  },
  line: {
    stroke: defaultColor
  },
  style: {
    'guide-title': {
      font: monospace,
      fontSize: fontSize,
      fontWeight: 'normal'
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
    fontWeight: 'normal',
    offset: 12
  }
};
