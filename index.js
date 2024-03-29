#!/usr/bin/env node
/**
 * Console interface for wgrep
 */
const co = require('co');
const wgrep = require('./wgrep');
const program = require('commander');
const { version } = require('./package.json');

(async () => {

  program
    .arguments('<regex> <url>')
    .version(version, '-V, --version')
    .option('-d, --directory <directory>', 'The output directory', 'output')
    .option('-u, --username <username>', 'The user to authenticate as')
    .action(function( regex, url ) {

      const options = program.opts()

      co(async function () {
        wgrep.ensureOutput(options.directory)
        console.log(`Calling for "${regex}" in "${options.directory}" from "${url}" with user "${options.username}"`)
        await wgrep.download( url, options.directory );
        wgrep.show(wgrep.find( options.directory, regex ))
      });

   })
   .parse(process.argv)

})()
