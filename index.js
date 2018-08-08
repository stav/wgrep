#!/usr/bin/env node
/**
 * Console interface for wgrep
 */
'use strict';
const co = require('co');
const wgrep = require('./wgrep');
const program = require('commander');

program
  .arguments('<text> <url>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .action(function( text, url ) {

    co(function *() {
      console.log('Calling for "%s" at "%s" with user "%s"', text, url, program.username)
      console.log(yield wgrep.download( url ))
      console.log(wgrep.find( text ))
    });

 })
 .parse(process.argv)
