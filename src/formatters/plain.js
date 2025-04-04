import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (ast, path = '') => {
  return ast
    .flatMap(({ type, key, value, value1, value2, children }) => {
      const propertyPath = path ? `${path}.${key}` : key;
      switch (type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${propertyPath}' was removed`;
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
        case 'nested':
          return formatPlain(children, propertyPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    })
    .join('\n');
};

export default formatPlain;
