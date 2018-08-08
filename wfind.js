/**
 * Find text within all resources of a webpage
 */
'use strict';
const puppeteer = require('puppeteer');
const { URL } = require('url');  // core
const findit = require('findit')
const path = require('path');  // core
const fse = require('fs-extra');
const fs = require('fs');

/**
 * Download all files with a headless browser and save to output directory
 */
const download = async function ( url ) {
  console.log('Downloading "%s"', url)

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('response', async (response) => {
    const url = new URL(response.url());
    let filePath = path.resolve(`./output${url.pathname}`);
    if (path.extname(url.pathname).trim() === '') {
      filePath = `${filePath}/index.html`;
    }
    await fse.outputFile(filePath, await response.buffer());
  });

  await page.goto( url, {
    waitUntil: 'networkidle2'
  });
  await page.screenshot({path: 'screencap.png', fullPage: true});
  console.log( url )
  await browser.close();

  return 'seems ok'
};

/**
 * Search for text recursively in output directory
 *
 * https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
 * https://nodejs.org/api/stream.html#stream_class_stream_readable
 */
const find = function ( text ) {
  console.log('Finding "%s"', text)
  const finder = findit('output');

  finder.on('file', function (path, stat) {
    let stream = fs.createReadStream(path);
    stream.on('data', (chunk) => {
      if ( (''+chunk).match( text ) ) {
        console.log(`  * ${path}`);
      }
    });

  })
  return
}

exports.download = download;
exports.find = find;
