import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import parseData from '../src/parcer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fixture1 = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

test('genddiff', () => {
  expect(gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe(fixture1);
});

test('parcer throws error on unsupported extension', () => {
  expect(() => parseData('file.yaml')).toThrow('Unsupported extension!');
});

test('parcer correctly parses JSON', () => {
  const fixture2 = parseData('__fixtures__/file1.json');
  expect(fixture2).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
