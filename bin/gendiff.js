#!/usr/bin/env node
import { Command } from 'commander';
import app from '../src/gendiff.js';

const program = new Command();

const gendiff = program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish') // По умолчанию 'stylish'
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = app(filepath1, filepath2, options.format);
    console.log(diff);
  });
gendiff.parse();
