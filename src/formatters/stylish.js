import _ from 'lodash';

const getIndent = (spaceCount, bracket = ' ', bracketNumbers = 4) => bracket
  .repeat(bracketNumbers * spaceCount - bracketNumbers);

const stringify = (obj, replace) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const spaceCount = depth * replace;
    const space = getIndent(spaceCount);
    const lines = Object
      .entries(data)
      .map(([key, value]) => `${space}        ${key}: ${iter(value, depth + 1)}`);
    return ['{', ...lines, `${space}    }`].join('\n');
  };
  return iter(obj, 1);
};

const stylish = (obj) => {
  const iter = (data, depth = 1) => {
    const indent = getIndent(depth);
    const result = data.map((item) => {
      switch (item.type) {
        case 'removed':
          return `${indent}  - ${item.key}: ${stringify(item.value, depth)}`;
        case 'added':
          return `${indent}  + ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return [
            `${indent}  - ${item.key}: ${stringify(item.value1, depth)}`,
            `${indent}  + ${item.key}: ${stringify(item.value2, depth)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}    ${item.key}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${indent}    ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`${item.type} is not a valid value`);
      }
    });
    return ['{', ...result, `${indent}}`].join('\n');
  };
  return iter(obj);
};
export default stylish;
