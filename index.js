#!/usr/bin/env node
/**
 * Console interface for wgrep
 */
const co = require('co');
const wgrep = require('./wgrep');
const program = require('commander');

(async () => {

  program
    .arguments('<regex> <url>')
    .option('-d, --directory <directory>', 'The output directory', 'output')
    .option('-u, --username <username>', 'The user to authenticate as')
    .action(function( regex, url ) {

      co(async function () {
        console.log(`Calling for "${regex}" in "${program.directory}" from "${url}" with user "${program.username}"`)
        const errors = await wgrep.download( url, program.directory );
        if ( errors.flag ) {
          console.log('Errors', errors)
        }
        wgrep.show(wgrep.find( program.directory, regex ))
      });

   })
   .parse(process.argv)

})()

