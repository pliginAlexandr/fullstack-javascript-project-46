import fs from 'fs';
import path from 'path';

const parceData = (filepath) => {
  const filetype = path.extname(path.resolve(filepath));
  if (filetype === '.json') {
    const data = fs.readFileSync(path.resolve(filepath));
    return JSON.parse(data);
  }
  throw new Error('Unsupported extension!');
};
export default parceData;
