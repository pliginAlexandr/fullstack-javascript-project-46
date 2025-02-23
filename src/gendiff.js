import parseData from './parser.js';
import stylish from './formatters/stylish.js';
import buildAst from './buildAst.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);
  const ast = buildAst(data1, data2);

  switch (format) {
    case 'stylish':
      return stylish(ast);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default gendiff;
