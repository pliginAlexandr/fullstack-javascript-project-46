import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getJsonPath = (filename) => path.join(__dirname, '..', filename);
const result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

test('genddiff', () => {
  expect(gendiff(
    getJsonPath('file1.json'),
    getJsonPath('file2.json'),
  )).toBe(result);
});
