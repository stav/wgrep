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
  let errors = {flag: false, net: 0, buf: 0, main: 0, page: 0 };

  page.on('error', e=> { errors.flag = true; errors.main++ })
  page.on('pageerror', e=> { errors.flag = true; errors.page++ })
  page.on('response', async (response) => {
    const _url = new URL(response.url());
    let filePath = path.join( __dirname, directory, _url.pathname );
    // console.log('filePath', filePath)
    if (path.extname(_url.pathname).trim() === '') {
      filePath = `${filePath}/index.html`;
    }
    try {
      await fse.outputFile(filePath, await response.buffer());
    }
    catch (e) {
      // console.log(e.toString(), _url.href)
      errors.flag = true;
      errors.buf++
    }
  });

  try {
    await page.goto( url, {waitUntil: 'networkidle2'});
    await page.screenshot({path: 'screencap.png', fullPage: true});
  }
  catch (e) {
    console.log(e.toString())
    errors.flag = true;
    errors.net++
  }
  finally {
    await browser.close();
    return errors
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
    const files = find( directory ).filter( file=> test('-f', file) );
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

exports.download = download;
exports.find = find;
exports.show = show;
