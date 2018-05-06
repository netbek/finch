import {vg} from '@netbek/finch';

const {spec} = vg('data/iris.csv')
  .title("Edgar Anderson's Iris Data")
  .width(200);

export default spec;
