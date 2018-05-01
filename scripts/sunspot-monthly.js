/**
 * Tidy up sunspot CSV
 */

const _ = require('lodash');
const fs = require('fs');
const fsExtra = require('fs-extra');
const moment = require('moment');
const Papa = require('papaparse');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

function tidyDate(str) {
  const year = parseInt(str, 10).toString();
  const decimal = Number(str) - parseInt(year, 10);
  const isLeapYear = moment(year, 'YYYY').isLeapYear();
  const tidyStr = moment(year, 'YYYY')
    .add(parseInt(decimal * (isLeapYear ? 366 : 365), 10), 'days')
    .format('YYYY-MM');

  return tidyStr;
}

const file = fs.createReadStream('./src/docs/data/sunspot-month.csv');

Papa.parse(file, {
  header: true,
  complete: function(result) {
    let data = result.data.map(d => ({
      date: tidyDate(d.time),
      value: Number(d.sunspotMonth)
    }));

    const g = _.groupBy(data, 'date');
    const dates = _.keys(g);

    data = dates.map(d => ({
      date: d,
      value: g[d].reduce((r, v) => r + v.value, 0)
    }));

    data = _.orderBy(data, ['date']);

    fsExtra.outputFileAsync(
      './src/docs/data/sunspot-month-tidy.csv',
      data.map(d => `${d.date},${d.value}`).join('\n')
    );
  }
});
