import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import buildAst from './buildAst.js';
import getFormatter from './formatters/index.js';

const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFormat = (filepath) => path.extname(filepath);

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const ext1 = getFormat(filepath1);
  const ext2 = getFormat(filepath2);

  const parsedData1 = parse(data1, ext1);
  const parsedData2 = parse(data2, ext2);

  const diffTree = buildAst(parsedData1, parsedData2);
  const formatter = getFormatter(formatName);

  return formatter(diffTree);
};

export default gendiff;
