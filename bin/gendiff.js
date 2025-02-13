#!/usr/bin/env node
import { Command } from 'commander';
import app from '../src/index.js';

const program = new Command();

const gendiff = program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <string>', 'type format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((a, b, options) => {
    console.log(app(a, b, options));
  });

gendiff.parse();
