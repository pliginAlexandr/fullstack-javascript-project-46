const stylish = (diff) => {
  const iter = (node, depth) => {
    const indent = ' '.repeat(depth * 2);
    const lines = node.map((item) => {
      const { key } = item;
      const value = (typeof item.value === 'object' && item.value !== null)
        ? JSON.stringify(item.value)
        : item.value;

      switch (item.status) {
        case 'added':
          return `${indent}+ ${key}: ${value}`;
        case 'removed':
          return `${indent}- ${key}: ${value}`;
        case 'changed':
          return `${indent}- ${key}: ${item.oldValue}\n${indent}+ ${key}: ${item.newValue}`;
        case 'unchanged':
          return `${indent}  ${key}: ${value}`;
        case 'nested':
          return `${indent}  ${key}: {\n${iter(item.children, depth + 1)}\n${indent}  }`;
        default:
          return '';
      }
    }).filter(Boolean); // Убираем пустые строки

    return lines.join('\n'); // Соединяем строки с переносами
  };

  return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;
