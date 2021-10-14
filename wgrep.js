/**
 * Find text within all resources of a webpage
 */
const puppeteer = require('puppeteer');
const { URL } = require('url');  // core
const shell = require('shelljs');
const path = require('path');  // core
const fse = require('fs-extra');
const fs = require('fs');

/**
 * Download all files with a headless browser and save to output directory
 */
const download = async function ( url, directory ) {
  // console.log('* directory', directory)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const errors = { net: 0, buf: 0, main: 0, page: 0, fs: 0 };

  let payload = null;
  let logStream = fs.createWriteStream(path.join( __dirname, directory, '.wgrep.log'));
  // logStream.on('finish', () => {
  //     console.log('wrote all data to log file');
  // });
  page.on('error', e=> { errors.main++ })
  page.on('pageerror', e=> { errors.page++ })
  page.on('response', async (response) => {
    const _url = new URL(response.url());

    let filePath = path.join( __dirname, directory, _url.pathname );
    // console.log('* filePath', filePath)
    if (path.extname(_url.pathname).trim() === '') {
      filePath = path.join(filePath, 'index.html');
    }

    try {
      payload = await response.buffer();
    }
    catch (e) {
      logStream.write(`${e} (${_url.href})\n`)
      errors.buf++
    }
    try {
      if (!payload) {
        logStream.write('No payload for ' + _url + '\n')
      }
      else {
        await fse.outputFile(filePath, payload);
      }
    }
    catch (e) {
      logStream.write(`${e} (${_url.href}) ${filePath}\n`)
      errors.fs++
    }
  });

  try {
    // console.log('* goto', url)
    await page.goto( url, {waitUntil: 'networkidle2'});
    await page.screenshot({path: 'screencap.png', fullPage: true});
  }
  catch (e) {
    logStream.write(e.toString());
    errors.net++
  }
  finally {
    await browser.close()
    logStream.write(`\n${JSON.stringify(errors, null, 2)}\n`)
    logStream.end()
  }
};

/**
 * Search for text recursively in output directory
 *
 * https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
 * https://nodejs.org/api/stream.html#stream_class_stream_readable
 */
const find = ( directory, regex ) => {
  const
    find = shell.find,
    grep = shell.grep,
    test = shell.test;
  if ( test('-d', directory) ) {
    console.log(`Looking in "${directory}" for '${regex}'`)
    const files = find( directory )
      .filter( file => test('-f', file) )
      .filter( file => !file.includes('.wgrep.log') );
    return grep('-l', regex, files ).trim().split('\n').filter(_=>_)
  }
  else {
    console.log(`Directory "${directory}" does not exist`)
    return []
  }
}

/**
 * Display a list of given file names
 */
const show = files => {
  console.log( 'Found', files.length, 'files' )
  if ( files.length ) {
    console.log( files )
  }
}

/**
 * Create the output directory if it doesn't exist
 */
const ensureOutput = directory => {
  const d = path.join( __dirname, directory );

  if (!fs.existsSync(d)){
    console.log('Creating output directory', d)
    fs.mkdirSync(d);
  }
}

exports.ensureOutput = ensureOutput;
exports.download = download;
exports.find = find;
exports.show = show;
