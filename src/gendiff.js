import parseData from './parser.js';
import buildAst from './buildAst.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);
  const diffTree = buildAst(data1, data2);
  const formatter = getFormatter(formatName);
  return formatter(diffTree);
};

export default genDiff;
