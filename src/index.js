import parceData from './parcer.js';

export default (filepath1, filepath2) => {
  const content1 = parceData(filepath1);
  console.log(content1);
  const content2 = parceData(filepath2);
  console.log(content2);
  return content1 === content2;
};
