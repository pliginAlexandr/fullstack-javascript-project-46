import path from 'path';
import fs from 'fs';
import parceData from './parcer.js';

export default (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const parcedData1 = parceData(content1);
  const parcedData2 = parceData(content2);
  
  return parcedData1 === parcedData2;
};
