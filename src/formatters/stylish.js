import _ from 'lodash';

const indentSize = 4;

const getIndent = (depth) => '  '.repeat(depth * indentSize - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${getIndent(depth)}  }`;
};

const stylish = (diff, depth = 1) => {
  const result = diff.map((node) => {
    const indent = getIndent(depth);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'updated':
        return `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
      default:
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
    }
  });

  return result.join('\n');
};

export default stylish;
