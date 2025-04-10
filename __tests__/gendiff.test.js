import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff default format (stylish)', () => {
  const expected = readFixture('result.txt').trim();
  const result = gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  ).trim();
  expect(result).toBe(expected);
});

test('gendiff plain format', () => {
  const expected = readFixture('plainResult.txt').trim();
  const result = gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'plain',
  ).trim();
  expect(result).toBe(expected);
});

test('gendiff json format', () => {
  const expected = readFixture('jsonResult.txt').trim();
  const result = gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'json',
  ).trim();
  expect(result).toBe(expected);
});

test('gendiff throws error for unknown format', () => {
  const format = 'foobar';
  expect(() => gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    format,
  )).toThrow(`Unknown format: ${format}`);
});
