#!/usr/bin/env node

var minimist = require('minimist')
var standard = require('../')

var argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    verbose: 'v'
  boolean: [
    'help',
    'stdin',
    'verbose',
    'version'
  ],
  default: {
    stdin: !process.stdin.isTTY
  }
})

if (argv.help) {
  console.log(function () {
  /*
  Usage:
      standard <flags>

  Flags:
      -v, --verbose    Show error codes (so you can ignore specific rules)
          --stdin      Force processing input from stdin
          --version    Display the current version
      -h, --help       Display the help and usage details

  Report bugs:  https://github.com/feross/standard/issues

  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

if (argv.version) {
  console.log(require('../package.json').version)
  process.exit(0)
}

standard({
  cwd: process.cwd(),
  files: argv._,
  stdin: argv.stdin,
  verbose: argv.verbose
})
