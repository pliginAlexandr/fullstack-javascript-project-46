import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parseData from '../src/parser.js';
import gendiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fixture1 = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

test('genddiff', () => {
  const result = gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  );
  expect(result.trim()).toEqual(fixture1.trim());
});

test('parcer correctly parses JSON', () => {
  const fixture2 = parseData('__fixtures__/file1.json');
  expect(fixture2).toEqual({
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  });
});

test('parcer correctly parses YAML', () => {
  const yamlFixture = parseData('__fixtures__/yamlfile1.yaml');
  expect(yamlFixture).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('parcer throws error on unsupported extension', () => {
  expect(() => parseData('result.txt')).toThrow('Unsupported extension!');
});

test('gendiff should throw error for unsupported stylisher', () => {
  const format = 'foobar';
  expect(() => gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', format)).toThrow(`Unknown format: ${format}`);
});

test('throws an error for an invalid type', () => {
  const input = [
    {
      key: 'invalid',
      type: 'unknown',
      value: 'someValue',
    },
  ];

  expect(() => stylish(input)).toThrow('unknown is not a valid value');
});

test('plain format is correct', () => {
  const plainResult = gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'plain',
  );
  const fixture3 = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
  expect(plainResult).toEqual(fixture3);
});

test('plain format should throw error for an invalid type', () => {
  const inputPlane = [
    {
      key: 'invalid',
      type: 'unknown',
      value: 'someValue',
    },
  ];
  expect(() => formatPlain(inputPlane)).toThrow('Unknown node type: unknown');
});

test('gendiff json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const fixture4 = fs.readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');
  expect(gendiff(filepath1, filepath2, 'json')).toBe(fixture4);
});
