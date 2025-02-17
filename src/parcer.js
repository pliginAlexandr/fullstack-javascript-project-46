import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readData = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

const parseData = (filepath) => {
  const filetype = path.extname(path.resolve(filepath));
  if (filetype === '.json') {
    const data = readData(filepath);
    return JSON.parse(data);
  } if (filetype === '.yml' || filetype === '.yaml') {
    const data = readData(filepath);
    console.log(yaml.load(data));
    return yaml.load(data);
  }
  throw new Error('Unsupported extension!');
};
export default parseData;
