#!/usr/bin/env node
/**
 * Condole interface for wfind
 */
'use strict';
const co = require('co');
const wfind = require('./wfind');
const program = require('commander');

console.log('Hello, world!')

program
  .arguments('<text> <url>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .action(function(text, url) {

    co(function *() {
      console.log('Looking for "%s" at "%s" with user "%s"', text, url, program.username)
      console.log(yield wfind.wfind())
    });

 })
 .parse(process.argv)
