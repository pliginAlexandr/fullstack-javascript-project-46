const indentSize = 4;
const indentShift = 2;

const getIndent = (depth) => ' '.repeat(depth * indentSize - indentShift);
const getBracketIndent = (depth) => ' '.repeat(depth * indentSize - indentSize);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value).map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return `{
${entries.join('\n')}
${getBracketIndent(depth)}}`;
};

const stylish = (diff, depth = 1) => {
  const formatted = diff.map(({
    key, type, value, oldValue, newValue, children,
  }) => {
    const indent = getIndent(depth);
    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth)}`;
      case 'updated':
        return [
          `${indent}- ${key}: ${stringify(oldValue, depth)}`,
          `${indent}+ ${key}: ${stringify(newValue, depth)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth)}`;
      case 'nested':
        return `${indent}  ${key}: {
${stylish(children, depth + 1)}
${getBracketIndent(depth)}}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return formatted.join('\n');
};

export default (diff) => `{
${stylish(diff, 1)}
}`;
