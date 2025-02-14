import fs from 'fs';
import path from 'path';

const parceData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  return JSON.parse(data);
};
export default parceData;
