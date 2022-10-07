# Minimist

Parse argument options.

This is a direct copy of Substack's [`minimist` v1.2.6](https://www.npmjs.com/package/minimist) who's github account was deleted for some reason.

## Example

`parse.js`

```js
import parseArgs from '@jwerre/minimist';
const argv = parseArgs(process.argv.slice(2));
console.log(argv);
```

```bash
$ node ./parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
```

```bash
$ node ./parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{
  _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop'
}
```

## Options

Return an argument object `argv` populated with the array arguments from `args`.

`argv._` contains all the arguments that didn't have any options associated with
them. Numeric-looking arguments will be returned as numbers unless `opts.string`
or `opts.boolean` is set for that argument name. Any arguments after `--` will
not be parsed and will end up in `argv._`.

| Param          | Type       | Description                                                                                                                                                                                            |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| args           | `Array`    | Command line argument to parse. Typeicaly in the form of `process.argv.slice(2)`                                                                                                                       |
| opts           | `Object`   | Parsing options.                                                                                                                                                                                       |
| opts.string    | `String`   | A string or array of strings argument names to always treat as strings                                                                                                                                 |
| opts.boolean   | `Boolean`  | A boolean, string or array of strings to always treat as booleans. if `true` will treat all double hyphenated arguments without equal signs as boolean (e.g. affects `--foo`, not `-f` or `--foo=bar`) |
| opts.alias     | `Object`   | An object mapping string names to strings or arrays of string argument names to use as aliases                                                                                                         |
| opts.default   | `Object`   | An object mapping string argument names to default values                                                                                                                                              |
| opts.stopEarly | `Boolean`  | When true, populate argv.\_ with everything before the `--` and `argv['--']` with everything after the `--`. See example below.                                                                        |
| opts.unknown   | `function` | a function which is invoked with a command line parameter not defined in the `opts` configuration object. If the function returns `false`, the unknown option is not added to `argv`.                  |

### `stopEarly` example

```js
parseArgs('one two three -- four five --six'.split(' '), { '--': true });
// { _: [ 'one', 'two', 'three' ], '--': [ 'four', 'five', '--six' ] }
```

_Note_ that with `opts['--']` set, parsing for arguments still stops after the `--`.

## Install

```bash
npm install @jwerre/minimist
```

## Difference between V1 and V2

The only different between the version 1 and 2 is that version 2 uses the ES6
Module definition.

### Version 1

```bash
npm install @jwerre/minimist@1.2.6
```

```js
const parseArgs = require('@jwerre/minimist');
const argv = parseArgs(process.argv.slice(2));
console.log(argv);
```

### Version 2

```bash
npm install @jwerre/minimist@2
```

```js
import parseArgs from '@jwerre/minimist';
const argv = parseArgs(process.argv.slice(2));
console.log(argv);
```
