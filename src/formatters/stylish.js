import _ from 'lodash';

const getIndent = (spaseCount, bracket = ' ', bracketNumbers = 4) => bracket
  .repeat(bracketNumbers * spaseCount - bracketNumbers);

const stringify = (obj, replace) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const spaseCount = depth * replace;
    const spase = getIndent(spaseCount);
    const lines = Object
      .entries(data)
      .map(([key, value]) => `${spase}        ${key}: ${iter(value, depth + 1)}`);
    return ['{', ...lines, `${spase}    }`].join('\n');
  };
  return iter(obj, 1);
};

const stylish = (obj) => {
  const iter = (data, depth = 1) => {
    const indent = getIndent(depth);
    const result = data.map((element) => {
      switch (element.type) {
        case 'removed':
          return `${indent}  - ${element.key}: ${stringify(element.value, depth)}`;
        case 'added':
          return `${indent}  + ${element.key}: ${stringify(element.value, depth)}`;
        case 'changed':
          return [
            `${indent}  - ${element.key}: ${stringify(element.value1, depth)}`,
            `${indent}  + ${element.key}: ${stringify(element.value2, depth)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}    ${element.key}: ${stringify(element.value, depth)}`;
        case 'nested':
          return `${indent}    ${element.key}: ${iter(element.children, depth + 1)}`;
        default:
          throw new Error(`${element.type} is not a valid value`);
      }
    });
    return ['{', ...result, `${indent}}`].join('\n');
  };
  return iter(obj);
};
export default stylish;
