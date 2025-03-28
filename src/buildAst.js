import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const unionKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sort = unionKeys.toSorted();
  const result = sort
    .map((key) => {
      if (!Object.hasOwn(obj1, key)) {
        return { type: 'added', key, value: obj2[key] };
      }
      if (!Object.hasOwn(obj2, key)) {
        return { type: 'removed', key, value: obj1[key] };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { type: 'nested', key, children: buildAst(obj1[key], obj2[key]) };
      }
      if (!_.isEqual(obj1[key], obj2[key])) {
        return {
          type: 'changed', key, value1: obj1[key], value2: obj2[key],
        };
      }
      return { type: 'unchanged', key, value: obj1[key] };
    });
  return result;
};

export default buildAst;