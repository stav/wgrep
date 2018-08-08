#!/usr/bin/env node
/**
 * Console interface for wfind
 */
'use strict';
const co = require('co');
const wfind = require('./wfind');
const program = require('commander');

console.log('Hello, world!')

program
  .arguments('<text> <url>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .action(function( text, url ) {

    co(function *() {
      console.log('Calling for "%s" at "%s" with user "%s"', text, url, program.username)
      console.log(yield wfind.download( url ))
      console.log(wfind.find( text ))
    });

 })
 .parse(process.argv)
