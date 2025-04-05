import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (format) => {
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatters[format];
};
