## Gendiff Util

Gendiff is one of the learning projects that compares two **.json** or **.yaml/.yml** files and outputs the differences.

### Hexlet Tests and Linter Status

[![Actions Status](https://github.com/pliginAlexandr/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/pliginAlexandr/fullstack-javascript-project-46/actions)

### CodeClimate Status

[![Maintainability](https://api.codeclimate.com/v1/badges/2f55bab78313e1eebfb0/maintainability)](https://codeclimate.com/github/pliginAlexandr/fullstack-javascript-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2f55bab78313e1eebfb0/test_coverage)](https://codeclimate.com/github/pliginAlexandr/fullstack-javascript-project-46/test_coverage)

### 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone git@github.com:pliginAlexandr/fullstack-javascript-project-46.git
cd fullstack-javascript-project-46
make install
```

### 📄 Usage
```bash
gendiff -f <format> <filepath1> <filepath2>
```

format — output format: stylish (default), plain, or json

filepath — path to a .json, .yaml, or .yml file

### 📦 Supported File Formats:

JSON (.json)

YAML (.yml, .yaml)

### 🎨 Output Formats:
#### Stylish(default):
```bash
gendiff file1.json file2.json

{
  - follow: false
  + follow: true
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
}
```
#### Plain:
```bash
gendiff -f plain file1.yaml file2.yaml

Property 'follow' was updated. From false to true  
Property 'proxy' was removed  
Property 'timeout' was updated. From 50 to 20
```

#### Json:
```bash
gendiff -f json file1.json file2.json
[
  {
    "key": "follow",
    "status": "updated",
    "oldValue": false,
    "newValue": true
  }
]
```
### 🧪 Running Tests
```bash
make test
make test-coverage
```

### Linting
```bash
make lint
```

### Asciinemas
#### Gendiff -h
[![asciicast](https://asciinema.org/a/c99Lsg5i414B9scEvlDEewm7k.svg)](https://asciinema.org/a/c99Lsg5i414B9scEvlDEewm7k)
#### Gendiff stylish
[![asciicast](https://asciinema.org/a/l81GgF4zk7vQ0YOdOJGaqHRFo.svg)](https://asciinema.org/a/l81GgF4zk7vQ0YOdOJGaqHRFo)
#### Gendiff plain
[![asciicast](https://asciinema.org/a/6hh15YLXFUeaLIdjlBd9aMmIu.svg)](https://asciinema.org/a/6hh15YLXFUeaLIdjlBd9aMmIu)
#### Gendiff json
[![asciicast](https://asciinema.org/a/mXtlFt5gILI8YrTSsIAdx6ZIt.svg)](https://asciinema.org/a/mXtlFt5gILI8YrTSsIAdx6ZIt)

