import parceData from './parcer.js';

export default (filepath1, filepath2) => {
  const data1 = parceData(filepath1);
  const data2 = parceData(filepath2);

  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const diff = keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }

    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};
